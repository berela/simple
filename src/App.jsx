import { useMemo, useState } from 'react'
import './App.css'

const categories = [
  { id: 'all', label: 'ყველა' },
  { id: 'dev', label: 'განვითარება' },
  { id: 'infra', label: 'ინფრასტრუქტურა' },
  { id: 'security', label: 'უსაფრთხოება' },
  { id: 'data', label: 'მონაცემები' },
]

const topics = [
  {
    icon: '💻',
    title: 'პროგრამული უზრუნველყოფა',
    category: 'dev',
    text: 'აპლიკაციები, ვებსაიტები და სისტემები, რომლებიც ყოველდღიურ ცხოვრებას უფრო მოსახერხებელს ხდის.',
  },
  {
    icon: '🌐',
    title: 'ქსელები და ინტერნეტი',
    category: 'infra',
    text: 'მონაცემების გადაცემა, Wi-Fi, ღრუბლოვანი სერვისები და მსოფლიოს ნებისმიერ წერტილთან კავშირი.',
  },
  {
    icon: '🔒',
    title: 'კიბერუსაფრთხოება',
    category: 'security',
    text: 'მონაცემების დაცვა, პაროლები, ორფაქტორიანი ავთენტიფიკაცია და უსაფრთხო ციფრული გარემო.',
  },
  {
    icon: '☁️',
    title: 'ღრუბლოვანი ტექნოლოგიები',
    category: 'infra',
    text: 'ფაილების შენახვა და სერვისების გამოყენება ინტერნეტში — Google Drive, AWS, Azure და სხვა.',
  },
  {
    icon: '🤖',
    title: 'ხელოვნური ინტელექტი',
    category: 'dev',
    text: 'მანქანური სწავლება და ჭკვიანი ასისტენტები, რომლებიც ავტომატიზაციასა და ანალიზში ეხმარებიან.',
  },
  {
    icon: '📊',
    title: 'მონაცემთა ბაზები',
    category: 'data',
    text: 'ინფორმაციის სტრუქტურირებული შენახვა, ძიება და ანალიზი ორგანიზაციებისთვის.',
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase()

    return topics.filter((topic) => {
      const matchesCategory = category === 'all' || topic.category === category
      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        topic.text.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <div className="page">
      <header className="hero">
        <p className="badge">ინფორმაციული გვერდი</p>
        <h1>ინფორმაციული ტექნოლოგიები</h1>
        <p className="subtitle">
          IT (Information Technology) — ტექნოლოგიების სფერო, რომელიც ინფორმაციის შეგროვებას,
          დამუშავებას, შენახვას და გადაცემას ემსახურება.
        </p>
      </header>

      <section className="intro">
        <h2>რა არის IT?</h2>
        <p>
          ინფორმაციული ტექნოლოგიები მოიცავს კომპიუტერულ ტექნიკას, პროგრამებს, ქსელებს და
          ციფრულ სისტემებს. ისინი გამოიყენება განათლებაში, მედიცინაში, ბიზნესში, მთავრობაში
          და ყოველდღიურ ცხოვრებაში — სმარტფონიდან ბანკის აპლიკაციამდე.
        </p>
      </section>

      <section className="topics">
        <h2>ძირითადი მიმართულებები</h2>

        <div className="filter-bar">
          <label className="search-field">
            <span className="visually-hidden">ძიება</span>
            <input
              type="search"
              placeholder="ძიება სათაურით ან აღწერით..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <div className="category-filters" role="group" aria-label="კატეგორიის ფილტრი">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={category === item.id ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="filter-result">
          ნაპოვნია: <strong>{filteredTopics.length}</strong> / {topics.length}
        </p>

        {filteredTopics.length > 0 ? (
          <div className="grid">
            {filteredTopics.map((topic) => (
              <article key={topic.title} className="card">
                <span className="card-icon" aria-hidden="true">{topic.icon}</span>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">შედეგი ვერ მოიძებნა. სცადე სხვა სიტყვა ან კატეგორია.</p>
        )}
      </section>

      <section className="facts">
        <h2>საინტერესო ფაქტები</h2>
        <ul>
          <li>პირველი ელექტრონული კომპიუტერი ENIAC 1945 წელს შეიქმნა.</li>
          <li>ინტერნეტი 1969 წელს დაიწყო ARPANET პროექტის სახით.</li>
          <li>მსოფლიოში ყოველ წამს ტერაბაიტების მოცულობის მონაცემი იქმნება.</li>
          <li>IT სპეციალისტების მოთხოვნა მუდმივად იზრდება.</li>
        </ul>
      </section>

      <footer className="footer">
        <p>შექმნილია React-ით · {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
