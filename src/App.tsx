import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { AppProviders } from "./app/Providers.tsx"

const App = () => {
  return (
    <AppProviders>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </AppProviders>
  )
}

export default App
