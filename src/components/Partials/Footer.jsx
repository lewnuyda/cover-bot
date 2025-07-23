import TitleText from "../UI/TitleText";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-6 text-center space-y-2">
      <TitleText variant="small" color="blue-gray" className="font-normal">
        &copy; {new Date().getFullYear()} Cover Bot. All rights reserved.
      </TitleText>
      <TitleText
        variant="small"
        color="blue-gray"
        className="font-light italic"
      >
        Your AI partner for job-winning letters.
      </TitleText>
      <TitleText variant="small" color="blue-gray" className="font-light">
        Crafted with ❤️ using React & n8n.
      </TitleText>
    </footer>
  );
};

export default Footer;
