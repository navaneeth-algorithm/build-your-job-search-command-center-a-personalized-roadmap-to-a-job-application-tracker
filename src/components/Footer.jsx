function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Job Tracker. All rights reserved.</p>
    </footer>
  )
}

export default Footer
