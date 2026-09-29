// Run only after creating the public repository and configuring GitHub Pages.
// Authentication is handled by Git Credential Manager or SSH, never by this file.
import { execFileSync } from 'node:child_process';
import { existsSync, cpSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const username = process.argv[2];
if (!username || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(username)) throw new Error('Usage: node scripts/publish-pages.mjs GITHUB_USERNAME');
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=join(root,'dist');
if(!existsSync(join(dist,'index.html'))) throw new Error('Run npm run build first.');
const remote=`https://github.com/${username}/portfolio.git`;
const temp=mkdtempSync(join(tmpdir(),'johannes-pages-'));
const git=(...args)=>execFileSync('git',args,{cwd:temp,encoding:'utf8',stdio:['inherit','pipe','inherit']}).trim();
git('init');git('remote','add','origin',remote);
const existing=git('ls-remote','--heads','origin','pages');
if(existing){git('fetch','origin','pages');git('switch','-c','pages','FETCH_HEAD');git('rm','-r','--ignore-unmatch','.');}
else git('switch','--orphan','pages');
cpSync(dist,temp,{recursive:true});
git('add','--all');
if(!git('status','--porcelain')){console.log('Build already published.');process.exit(0);}
git('-c','user.name=Portfolio deployment','-c','user.email=deployment@localhost','commit','-m','Publish portfolio static build');
git('push','origin','pages');
console.log(`Published pages branch of ${remote}. Inspect webhook delivery and verify HTTPS. Temporary checkout retained: ${temp}`);
