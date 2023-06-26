function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-top">
      <p className="text-center text-dark my-3">
        {`Copyright ©${currYear} `}
        <a
          href="https://andriandev.my.id"
          target="_blank"
          className="text-dark text-decoration-none"
        >
          AndrianDev
        </a>
      </p>
    </footer>
  );
}

export default Footer;
