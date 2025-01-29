import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Streamer } from '@/models/Streamer'
import connectDB from '@/lib/mongodb'
import Image from 'next/image'

async function getStreamers() {
  try {
    await connectDB()
    const streamers = await Streamer.find({})
      .sort({ followers: -1 })
      .lean()
      .exec()
    
    return JSON.parse(JSON.stringify(streamers))
  } catch (error) {
    console.error('Error fetching streamers:', error)
    return []
  }
}

export default async function Home() {
  const streamers = await getStreamers()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="TENET Logo"
                width={140}
                height={32}
                className="w-auto h-8"
                priority
              />
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#traders" className="text-muted-foreground hover:text-primary transition-colors">Traders</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </nav>
            <Button asChild>
              <a href="/admin">
                <span className="mr-2">Admin</span>
                <span className="text-lg">→</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-background pt-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                <div className="w-8 h-8 rounded-full bg-primary/40"></div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-primary">Active community</span>
                <span className="text-muted-foreground">Trusted provider</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6">
              Influence. Enlighten.
              <br />
              <span className="text-primary">Empowerment.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
            A leading startup specializing in cryptocurrency-based marketing and broadcasting.
            </p>
            <Button size="lg" className="group">
              Try us for free!
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[140%] aspect-square">
              <div className="w-full h-full bg-[radial-gradient(closest-side,#22c55e15,transparent)]"></div>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/50 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-[url('/chart.svg')] bg-contain bg-no-repeat bg-center opacity-20"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-xl">
                    <div className="relative w-full aspect-square">
                      <div className="absolute inset-0 bg-[url('/bull.png')] bg-contain bg-no-repeat bg-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">We</span> Are
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
              We empower businesses to harness blockchain and digital assets in their marketing. Our real-time content creation and broadcaster training ensure engaging audience experiences. Partnering with expert traders, we deliver captivating entertainment and valuable trading insights.
              </p>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
              <Card className="bg-background/50 backdrop-blur-sm border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Founded in</CardTitle>
                  <div className="mt-4">
                    <span className="text-6xl font-bold text-primary">2024</span>
                    <p className="mt-4 text-sm text-muted-foreground">
                    Tenet was founded in 2024, established by a team of visionary leaders with expertise in blockchain technology, digital marketing, and live broadcasting.
                    </p>
                  </div>
                </CardHeader>
              </Card>
           
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {streamers.length}+
              </h3>
              <p className="text-xl text-muted-foreground">Broadcaster</p>
            </div>
            <div className="text-center">
              <h3 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                24/7
              </h3>
              <p className="text-xl text-muted-foreground">Live</p>
            </div>
            <div className="text-center">
              <h3 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                120K+
              </h3>
              <p className="text-xl text-muted-foreground">Database</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Partners</h2>
          <div className="relative flex overflow-hidden group">
            <div className="animate-slide">
              <div className="flex gap-[100px] min-w-max">
                <Image src="/partners/discord.svg" alt="Discord" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/simplefx.svg" alt="SimpleFX" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/bitunix.svg" alt="Bitunix" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/proton.svg" alt="Proton" width={124} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/tradingview.svg" alt="TradingView" width={174} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/stripe.svg" alt="Stripe" width={114} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/paypal.svg" alt="PayPal" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex gap-[100px] min-w-max">
                <Image src="/partners/discord.svg" alt="Discord" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/simplefx.svg" alt="SimpleFX" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/bitunix.svg" alt="Bitunix" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/proton.svg" alt="Proton" width={124} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/tradingview.svg" alt="TradingView" width={174} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/stripe.svg" alt="Stripe" width={114} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/partners/paypal.svg" alt="PayPal" width={144} height={36} className="object-contain opacity-50 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Tenet?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                      >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                </div>
                <CardTitle className="mb-10">Synergy</CardTitle>
                <CardDescription>
                We're not just a marketing agency—we blend financial expertise with high-impact content, delivering a unique fusion of trading insights and blockchain-powered engagement.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                      >
                    <path d="M12 2v20M2 12h20M12 9v6M9 12h6" />
                    <circle cx="12" cy="12" r="10" />
                        </svg>
                </div>
                <CardTitle className="mb-10">Growth</CardTitle>
                <CardDescription>
                With bold strategies and powerful partnerships, Tenet helps you stay ahead of the curve, turning digital opportunities into real growth.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <CardTitle className="mb-10">Audience</CardTitle>
                <CardDescription>
                Join forces with Tenet and gain instant access to a dynamic network of 120,000+ engaged users. Maximize visibility, drive interaction, and expand your brand like never before.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Traders Section */}
      <section id="traders" className="py-20 bg-background scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Expert Traders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {streamers.map((streamer: any) => (
              <Card key={streamer._id} className="bg-[hsl(215deg_32.19%_12.02%_/_90%)] border-none shadow-lg hover:shadow-xl transition-shadow rounded-[1.5rem]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {streamer.imageUrl && (
                      <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden bg-muted shrink-0">
            <Image
                          src={streamer.imageUrl}
                          alt={streamer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle>{streamer.name}</CardTitle>
                      <CardDescription>{streamer.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-background/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">팔로워</p>
                      <p className="text-2xl font-bold">
                        {streamer.followers.toLocaleString()}
                      </p>
                    </div>
                      <div className="text-center p-4 rounded-lg bg-background/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">평균 시청자</p>
                      <p className="text-2xl font-bold">
                        {streamer.averageViewers.toLocaleString()}
                      </p>
                    </div>
                  </div>
                    <p className="text-sm text-muted-foreground">{streamer.description}</p>
                    {streamer.socialLinks && (
                      <div className="flex gap-4 pt-4 border-t">
                        {streamer.socialLinks.youtube && (
                      <a
                        href={streamer.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
          </a>
                    )}
                        {streamer.socialLinks.twitter && (
        <a
                        href={streamer.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                      >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                        {streamer.socialLinks.discord && (
                      <a
                        href={streamer.socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                      >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor">
                              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                        </svg>
                      </a>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Left Info Card */}
            <div className="bg-primary rounded-3xl p-8 flex flex-col">
              <div className="mb-8">
          <Image
                  src="/logo-2.png"
                  alt="TENET Logo"
                  width={140}
                  height={56}
                />
              </div>
              <h2 className="text-4xl font-bold text-background mb-2">
                Learn.Trade.
                <br />
                Succeed.
              </h2>
            </div>

            {/* Basic Plan */}
            <div className="bg-card/90 rounded-3xl p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">Free</span>
                  <span className="text-muted-foreground">account</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Enjoy completely free basic plan, free forever, no catch.
              </p>
              <Button variant="outline" className="w-full mb-8">
                Get free account
              </Button>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Market Makers Discord Free-Chat community room
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Market Makers VIP program at SimpleFX
                </li>
              </ul>
            </div>

            {/* Standard Plan */}
            <div className="bg-card/90 rounded-3xl p-8">
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">Standard (Website)</h3>
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">popular</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">$19.95</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Enjoy a 7-day free trial with this plan. Your subscription will be charged to the payment method provided after the trial unless cancelled
              </p>
              <Button className="w-full mb-8">
                Try us for free! →
              </Button>
              <p className="text-center text-sm text-muted-foreground mb-8">Paid monthly, cancel anytime</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Brendan's exclusive market updates
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fractal Pattern Trading (FPT) education series
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Brendan's personal video trade journal
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  BlackState & macro live-streams with Ricardo
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Regular video updates and TA from Senior analysts
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Market Makers VIP program at SimpleFX
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Full access to premium Discord community
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Permanent use of MM Tradingview indicators
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 on-call educational support
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-card/90 rounded-3xl p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro (Discord)</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">$39.95</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Enjoy a 7-day free trial with this plan. Your subscription will be charged to the payment method provided after the trial unless cancelled
              </p>
              <Button className="w-full mb-8">
                Try us for free! →
              </Button>
              <p className="text-center text-sm text-muted-foreground mb-8">Paid monthly, cancel anytime</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Brendan's exclusive market updates
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fractal Pattern Trading (FPT) education series
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Brendan's personal video trade journal
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  BlackState & macro live-streams with Ricardo
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Regular video updates and TA from Senior analysts
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Market Makers VIP program at SimpleFX
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Full access to premium Discord community
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Permanent use of MM Tradingview indicators
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 on-call educational support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <p className="text-sm text-primary uppercase tracking-wider mb-4">FREQUENTLY ASKED QUESTIONS</p>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  What do you
                  <br />
                  <span className="text-primary">need to know?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Check the FAQ for answers. If you still have questions,
                  reach out and chat with us any time.
                </p>
                <Button variant="outline" size="lg" className="group">
                  Get in touch
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-card/90 rounded-3xl p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                  <details className="[&_svg]:open:-rotate-180">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="text-lg font-semibold">What is Market Makers?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <div className="mt-4 text-muted-foreground">
                      <p>TENET is a premier crypto trading community that combines professional market analysis with an active social network. We provide real-time insights, educational resources, and a supportive environment for traders of all levels.</p>
                    </div>
                  </details>
                </div>

                <div className="bg-card/90 rounded-3xl p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                  <details className="[&_svg]:open:-rotate-180">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="text-lg font-semibold">What benefits do I get with a Standard website membership?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <div className="mt-4 text-muted-foreground">
                      <p>Standard membership includes exclusive market updates, educational content, live trading sessions, and access to our comprehensive trading resources. You'll receive regular market analysis, trading strategies, and can participate in our active trading community.</p>
                    </div>
                  </details>
                </div>

                <div className="bg-card/90 rounded-3xl p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
                  <details className="[&_svg]:open:-rotate-180">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="text-lg font-semibold">How does the Pro Discord membership enhance my trading experience?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <div className="mt-4 text-muted-foreground">
                      <p>Pro Discord membership offers premium features including real-time trading signals, direct access to expert traders, exclusive educational content, and priority support. You'll be part of our most engaged community with advanced trading insights and personalized guidance.</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-[hsl(215deg_32.19%_12.02%_/_90%)] rounded-3xl p-8 hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Gangnam Finance Center, Seoul</p>
            </div>

            <div className="bg-[hsl(215deg_32.19%_12.02%_/_90%)] rounded-3xl p-8 hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">+82-2-1234-5678</p>
            </div>

            <div className="bg-[hsl(215deg_32.19%_12.02%_/_90%)] rounded-3xl p-8 hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">contact@tenetmcn.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-[hsl(215deg_32.19%_12.02%_/_90%)] rounded-3xl p-8">
            <div className="grid grid-cols-[1fr,auto] gap-8">
              <div>
          <Image
                  src="/logo.png"
                  alt="TENET Logo"
                  width={140}
                  height={56}
                  className="w-[140px] h-auto mb-4"
                />
                <p className="text-muted-foreground max-w-md">
                  Where professional grade market analysis & vibrant social community converge.
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold mb-4">Contacts</h3>
                <ul className="space-y-2">
                  <li><a href="mailto:contact@tenetmcn.com" className="text-muted-foreground hover:text-primary">contact@tenetmcn.com</a></li>
                </ul>
                <div className="flex gap-6 mt-8 justify-end">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              <p>Copyright © 2024 TENET MCN. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
