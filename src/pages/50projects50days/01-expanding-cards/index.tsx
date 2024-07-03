import "./index.less";

const ExpandingCards = () => {
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      removeActiveClasses();
      panel.classList.add("active");
      console.log("[ click ] >", panel);
    });
  });

  function removeActiveClasses() {
    panels.forEach((panel) => {
      panel.classList.remove("active");
    });
  }

  return (
    <div className="expanding-cards-container">
      <div
        className="panel active"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h3>Explore The World</h3>
      </div>
      <div
        className="panel"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h3>Explore The World</h3>
      </div>
      <div
        className="panel"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h3>Explore The World</h3>
      </div>
      <div
        className="panel"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h3>Explore The World</h3>
      </div>
    </div>
  );
};

export default ExpandingCards;
