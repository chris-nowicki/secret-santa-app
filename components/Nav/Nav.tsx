const Nav = () => {
  return (
    <div className="bg-supernova flex h-screen w-[460px] flex-col justify-between px-12 pb-12 pt-[160px]">
      <nav className="top-nav">
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Our Group</a>
          </li>
          <li>
            <a href="#">My Wish List</a>
          </li>
        </ul>
      </nav>

      <nav className="bottom-nav">
        <div className="font-condensed text-spanishGreen mb-2 text-5xl uppercase">
          Past Events
        </div>
        <ul>
          <li>
            <a href="#">
              <div className="text-2xl font-bold">Smith Christmas</div>
              <div>December 23, 2023</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="text-2xl font-bold">Smith Christmas</div>
              <div>December 23, 2023</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
