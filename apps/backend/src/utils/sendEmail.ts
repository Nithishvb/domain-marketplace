interface ISendEmailType {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = (data: ISendEmailType) => {
    console.log(`Email was sent to the user ${data.to}`)
};
