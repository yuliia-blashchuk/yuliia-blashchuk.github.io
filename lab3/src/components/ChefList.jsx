// src/components/ChefList.jsx
function ChefList() {
  const chefs = [
    { id: 1, name: "Іван Поліщук", role: "Шеф-кухар", img: "images/shef-1.avif" },
    { id: 2, name: "Юлія Блащук", role: "Су-шеф", img: "images/ya-kuhar.png" },
    { id: 3, name: "Олег Бондар", role: "Кондитер", img: "images/shef-3.avif" }
  ];

  return (
    <section className="container section-block">
      <h2>Наші кухарі</h2>
      <ul className="chef-list">
        {chefs.map(chef => (
          <li key={chef.id} className="chef-card">
            <img src={chef.img} alt={chef.name} />
            <h3>{chef.name}</h3>
            <p>{chef.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ChefList;