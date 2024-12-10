export const formatEmailToName = (email:any) => {
  if (!email || typeof email !== "string") {
    return "Invalid email";
  }

  // Extract the part before the "@" in the email
  const [username] = email.split("@");

  // Split the username into two parts (assuming "firstName.lastName" format)
  const [firstName = "Anonymous", lastName = "User"] = username.split(".");

  // Format a single name (capitalize first letter, mask the rest with asterisks)
  const formatName = (name:any) => {
    return name.charAt(0).toUpperCase() + "*".repeat(name.length - 1);
  };

  // Format the names
  const formattedFirstName = formatName(firstName);
  const formattedLastName = formatName(lastName);

  // Return the final formatted string
  return `${formattedFirstName} ${formattedLastName}`;
};


export const formatMobileNumber = (mobile:any) => {
  const cleanedMobile = mobile.replace(/[^0-9]/g, "");
  // Mask the mobile number in the desired format
  const formattedNumber = `+90 5** *** ${cleanedMobile.slice(-4)}`;
  return formattedNumber;
};