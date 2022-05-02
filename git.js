import { exec } from "child_process";

const args = process.argv;
//console.log(args)
args.splice(0, 2);
let str = args.join(' ');
console.log('kkk', str);
exec('git add .');

// function cbadd(err, strout, sdtin) { 
//     if (err) {
//         console.log(err);
//         return;
//     }
//     //it worked
//     exec(`git commit -m "${str}"`, cbcommit);
// }

// function cbcommit(err, strout, sdtin) { 
//     if (err) {
//         console.log(err);
//         return;
//     }
//     //it worked
//     exec('done');
// }