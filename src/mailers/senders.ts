import email  from "./config";

const welcomeSender = (recipient: any, name: any, code: any) => {
  console.log("Called in Sender");
    email
    .send({
      template: "welcome",
      message: {
        to: recipient,        
      },
      locals: {
        name: name,
        code: code
      }
    })
    .then(console.log)
    .catch(console.error);
};

const forgotPasswordSender = (recipient: any, name: any, code: any) => {
    email
    .send({
      template: "forgot",
      message: {
        to: recipient,        
      },
      locals: {
        name: name,
        code: code
      }
    })
    .then(console.log)
    .catch(console.error);
};

export {    
    welcomeSender,
    forgotPasswordSender
};