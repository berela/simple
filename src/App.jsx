import { useEffect, useMemo, useState } from 'react'
import { Moon, Search, Sun } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const categories = [
  { id: 'all', label: 'ყველა' },
  { id: 'dev', label: 'განვითარება' },
  { id: 'infra', label: 'ინფრასტრუქტურა' },
  { id: 'security', label: 'უსაფრთხოება' },
  { id: 'data', label: 'მონაცემები' },
]

const categoryLabels = Object.fromEntries(
  categories.filter((c) => c.id !== 'all').map((c) => [c.id, c.label]),
)

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

const facts = [
  'პირველი ელექტრონული კომპიუტერი ENIAC 1945 წელს შეიქმნა.',
  'ინტერნეტი 1969 წელს დაიწყო ARPANET პროექტის სახით.',
  'მსოფლიოში ყოველ წამს ტერაბაიტების მოცულობის მონაცემი იქმნება.',
  'IT სპეციალისტების მოთხოვნა მუდმივად იზრდება.',
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

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
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="relative mb-10 text-center">
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark((value) => !value)}
              aria-label={isDark ? 'ღია თემა' : 'მუქი თემა'}
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>

          <Badge variant="secondary" className="mb-4">
            ინფორმაციული გვერდი
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            ინფორმაციული ტექნოლოგიები
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            IT (Information Technology) — ტექნოლოგიების სფერო, რომელიც ინფორმაციის
            შეგროვებას, დამუშავებას, შენახვას და გადაცემას ემსახურება.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>რა არის IT?</CardTitle>
            <CardDescription>
              მოკლე შესავალი ინფორმაციულ ტექნოლოგიებში
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            ინფორმაციული ტექნოლოგიები მოიცავს კომპიუტერულ ტექნიკას, პროგრამებს,
            ქსელებს და ციფრულ სისტემებს. ისინი გამოიყენება განათლებაში, მედიცინაში,
            ბიზნესში, მთავრობაში და ყოველდღიურ ცხოვრებაში — სმარტფონიდან ბანკის
            აპლიკაციამდე.
          </CardContent>
        </Card>

        <section className="mb-8">
          <div className="mb-5 flex flex-col gap-1">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              ძირითადი მიმართულებები
            </h2>
            <p className="text-sm text-muted-foreground">
              გაფილტრე თემები კატეგორიით ან ძიებით
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="ძიება სათაურით ან აღწერით..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <ToggleGroup
                variant="outline"
                size="sm"
                value={[category]}
                onValueChange={(values) => setCategory(values[0] ?? 'all')}
                className="flex w-full flex-wrap"
              >
                {categories.map((item) => (
                  <ToggleGroupItem key={item.id} value={item.id}>
                    {item.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <p className="text-sm text-muted-foreground">
                ნაპოვნია:{' '}
                <span className="font-medium text-foreground">
                  {filteredTopics.length}
                </span>{' '}
                / {topics.length}
              </p>
            </CardContent>
          </Card>

          {filteredTopics.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic) => (
                <Card key={topic.title} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl" aria-hidden="true">
                        {topic.icon}
                      </span>
                      <Badge variant="outline">{categoryLabels[topic.category]}</Badge>
                    </div>
                    <CardTitle className="text-base">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {topic.text}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search />
                </EmptyMedia>
                <EmptyTitle>შედეგი ვერ მოიძებნა</EmptyTitle>
                <EmptyDescription>
                  სცადე სხვა საძიებო სიტყვა ან აირჩიე სხვა კატეგორია.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle>საინტერესო ფაქტები</CardTitle>
            <CardDescription>IT-ის ისტორიიდან რამდენიმე მნიშვნელოვანი მომენტი</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          შექმნილია React + shadcn/ui-ით · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}

export default App
