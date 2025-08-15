import Header from "./widgets/header/ui/Header"
import Footer from "./widgets/footer/ui/Footer"
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
