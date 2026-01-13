function MainContent({ applications }) {
  return (
    <main className="main-content">
      <div className="content-placeholder">
        <h2>Your Applications</h2>
        <p>{applications.length} job applications tracked.</p>
      </div>
    </main>
  )
}

export default MainContent
