import resend from "../services/resend";

export const sendConfirmationMail = async ({
  email,
  name,
  roomName,
  startDate,
  endDate,
  amount,
  transactionId,
}: {
  email: string;
  name: string;
  roomName: string;
  startDate: string;
  endDate: string;
  amount: number;
  transactionId: string;
}) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirmation de votre réservation",
      html: `
        <h1>Merci pour votre réservation, ${name} !</h1>
        <p>Voici les détails de votre séjour :</p>
        <ul>
          <li>Chambre : ${roomName}</li>
          <li>Du : ${startDate}</li>
          <li>Au : ${endDate}</li>
          <li>Montant total : ${amount / 100}€</li>
          <li>Numéro de transaction : ${transactionId}</li>
        </ul>
        <p>Nous avons hâte de vous accueillir !</p>
      `,
    });
  } catch (error) {
    console.error("Error sending confirmation mail", error);
    throw error;
  }
};
