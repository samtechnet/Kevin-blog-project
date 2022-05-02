/**
 *script to use in package.json
 *  node git.js real update message
 */
import { exec } from "child_process";
let args = process.argv;
args.splice(0, 2);
let str = args.join(' ');
console.log(str);
exec('git add .', cbadd);

function cbadd(err, strout, sdtin) { 
    if (err) {
        console.log(err);
        return;
    }
    //it worked
    exec(`git commit -m "${str}"`, cbcommit);
}

function cbcommit(err, strout, sdtin) { 
    if (err) {
        console.log(err);
        return;
    }
    //it worked
    console.log('done');
}

// command to run your script will be: npm run gitty -- your commit message