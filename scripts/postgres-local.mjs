import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
const install = join(process.env.ProgramFiles || 'C:/Program Files', 'PostgreSQL');
const version = existsSync(install) && readdirSync(install).filter(v => existsSync(join(install, v, 'bin/initdb.exe'))).sort((a,b) => Number(b)-Number(a))[0];
const bin = process.env.PG_BIN || (version && join(install, version, 'bin'));
if (!bin) throw new Error('Install PostgreSQL or set PG_BIN to its bin directory. Alternatively use npm run db:up for Docker.');
const base = join(homedir(), 'Documents/Codex');
const data = process.env.ESPORTS_PG_DATA || join(base, 'esports-postgres-data');
const env = { ...process.env, PGPASSWORD: 'esports_dev_only' };
function run(name, args, required = true) {
  const result = spawnSync(join(bin, name + '.exe'), args, { env, stdio: 'inherit' });
  if (required && result.status !== 0) throw new Error(name + ' failed');
  return result.status;
}
if (process.argv[2] === 'stop') {
  run('pg_ctl', ['-D', data, '-m', 'fast', '-w', 'stop']);
} else {
  if (!existsSync(join(data, 'PG_VERSION'))) {
    mkdirSync(base, { recursive: true });
    const password = join(base, 'esports-postgres-password.txt');
    writeFileSync(password, env.PGPASSWORD);
    try { run('initdb', ['-D', data, '-U', 'esports', '--auth=scram-sha-256', '--encoding=UTF8', '--pwfile=' + password]); }
    finally { unlinkSync(password); }
  }
  if (run('pg_isready', ['-h', '127.0.0.1', '-p', '5433'], false) === 0) {
    console.log('Port 5433 is already serving PostgreSQL; use that instance or stop it before starting another.');
    process.exit(0);
  }
  const server = spawn(join(bin, 'postgres.exe'), ['-D', data, '-p', '5433', '-h', '127.0.0.1'], { env, stdio: 'inherit' });
  let initialized = false;
  const timer = setInterval(() => {
    const ready = spawnSync(join(bin, 'pg_isready.exe'), ['-h','127.0.0.1','-p','5433'], {env, stdio:'ignore'});
    if (ready.status !== 0 || initialized) return;
    initialized = true; clearInterval(timer);
    const check = spawnSync(join(bin,'psql.exe'), ['-h','127.0.0.1','-p','5433','-U','esports','-d','postgres','-tAc',"SELECT 1 FROM pg_database WHERE datname = 'esports'"], {env,encoding:'utf8'});
    if (check.status !== 0) { console.error(check.stderr); server.kill(); return; }
    if (check.stdout.trim() !== '1') run('createdb',['-h','127.0.0.1','-p','5433','-U','esports','esports']);
    console.log('Esports PostgreSQL ready. Keep this terminal open; run npm run db:setup in another terminal.');
  }, 500);
  server.on('exit', code => { clearInterval(timer); process.exitCode = code || 0; });
  process.on('SIGINT', () => { run('pg_ctl',['-D',data,'-m','fast','-w','stop'],false); });
}
