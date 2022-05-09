/**
 *script to use in package.json
 *  node git.js real update message
 */
import { exec } from "child_process";


let args = process.argv;
args.splice(0, 2);
let str = args.join(' ');
console.log(str);
exec("git add .", cbadd);


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


// exec('pwd', (err, stdout, stdin) => {
//     if (err) {
//         console.log(`err: ${err.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// })

// spawn('git add .', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`error: ${error.message}`);
//       return;
//     }
  
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return;
//     }
  
//     console.log(`stdout:\n${stdout}`);
//   });