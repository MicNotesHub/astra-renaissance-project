import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import cover from "@/assets/stella-polare-covers/midterms-2026.jpg";

export default function StellaPolareArticleMidterms() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="“The blue tsunami”: the 2026 US midterms — Stella Polare | ASTRA Bocconi"
        description="Democrats swept the House, the Senate and most governorships on November 3. What happened, why voters turned, and what a divided Washington means for Trump’s last two years."
        path={location.pathname}
        type="article"
      />
      <Navigation />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/stella-polare">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Stella Polare
            </Button>
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={cover}
                alt="The US Capitol dome with a blue wave sweeping across it"
                className="w-full h-full object-cover"
                width={1280}
                height={800}
                loading="lazy"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  6 novembre 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  “The blue tsunami”: the 2026 US midterms
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Pollsters had predicted a Democratic advance. What the American electorate delivered on November 3 surpassed every expectation.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>Pollsters had predicted a Democratic advance. But what the American electorate delivered on November 3 had surpassed every expectation: a result so lopsided that states which had voted Republican for years changed overnight, and the balance of power in Washington shifted in only a day.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">Taking a step back, what exactly are midterm elections?</h2>
                <p>Every two years, in the middle of the presidential mandate, American people are called to vote for their representatives in the two houses of Congress and for some of their state governors.</p>
                <p>To be more precise, United States’ Congress has two chambers, the House of representatives and the Senate. On one hand, there is the House of representatives, i.e. the lower house of the bicameral US Congress, which is made up of 435 members that serve for a term of two years. On the other, we have the Senate, i.e. the upper house, which consists of 100 members, 2 for each one of the 50 states, serving for six years.</p>
                <p>The forecast had pointed to a Democrat advantage, but the outcomes have been far more decisive:</p>
                <p><strong>House of representatives.</strong> Democrats have won control of the lower chamber, overturning the Republican majority held before the vote. On one hand, 240 seats for democrats and on the other, 147 for republicans, a shift of 30 seats from a party to the other, as for now.</p>
                <p><strong>Senate.</strong> The upper chamber changed hands as well. Democratic caucus has secured 54 seats, including two independent, against the Republicans’ 44, a net gain of seven. The flips came from Iowa, Kansas, Maine, North Carolina, Ohio, South Carolina and Texas, where James Talarico became the first Democrat in 32 years to win statewide office.</p>
                <p>Governorships. The shift was equally striking at state level. Democrats flipped governorships in Georgia, Iowa, Ohio and Texas. They now hold a majority of the fifty governorships for the first time in twenty years, after trailing 26 to 24 before the election. The symbolic weight is considerable: Ohio and Iowa had not elected a Democratic governor in a decade, Georgia in more than a quarter of a century, and Texas since 1990.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">Such a clean sweep raised a lot of questions: why did the electorate moved so fast?</h2>
                <p>Actually, such a radical shift of voters’ preferences is not strange in US history: after the Second World War, the phenomenon of the so-called “presidential penalty” (a midterm curse which strikes the president) has shown to be more than usual; before 2026 midterms, 18 times out of 20 the midterm elections for the House of Representatives have had been lost by the incumbent, while for the Senate those had been 13 out of 20.</p>
                <p>The size of the swing also has to do with how the American electoral system works. Each district elects one representative, and whoever gets the most votes wins. This “first-past-the-post” system tends to leave room for only two major parties, a pattern known in political science as Duverger’s law. As a result, voters unhappy with the president have one real alternative: the opposition.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">So, why did voters turn on Democrats?</h2>
                <p>Three were the main factors, according to the AP Voter Poll: dissatisfaction towards the economy, the war in Iran and concerns over government’s corruption.</p>
                <p>Roughly three-quarters of voters said the economy was “not so good” or “poor,” and about eight in ten said inflation had caused their household moderate or severe financial hardship. In effect, data show a 3.7% increase in inflation which has outpaced nominal wage growth, causing real wages to actually decrease (real average hourly earnings fell by 0.7%, while real weekly earnings fell by 0.1%). This is exactly why the result of these midterm elections is being sometimes said to be the effect of an “economic vote”, in a country which strongly relies on private transportation and therefore suffer a lot whenever a rise in fuel prices occur.</p>
                <p>In addition, the Iran war also hurt Republicans: ABC News’ voter poll found that 49% of House voters considered cost of living crucial to their vote, compared with 34% who said the same about the Iran war. Government corruption ranked higher still, at 54%.</p>
                <p>In this framework, looking at demographics is particularly telling: young voters were one of the strongest groups in the Democratic coalition, 73% of people under thirty supported Democratic candidates for the House, while older voters were more evenly split between the parties. Democrats also won strong support among Black and Hispanic voters and among women; differently, men were more evenly divided, just like older voters. The poll shows how these groups voted, though it cannot explain by itself what motivated each group.</p>
                <p>Among all the states, Texas is probably telling the more unexpected story; James Talarico’s victory gave Democrats their first statewide win in Texas since 1994 and their first Senate victory there since 1988. The result was striking because Donald Trump had carried Texas by a wide margin just two years earlier, during presidential elections. However, one election does not mean Texas has permanently changed sides.</p>
                <p>Again the Texas case shows a particularly salient issue which is creating debate in the US: fundings in politics. Elon Musk had invested millions of dollars in the Gold Old Party campaign in Texas which already hosts Tesla’s facilities and SpaceX activities; the latter was also considering building a data centre in the state.</p>
                <p>Musk soon became a focus of Talarico’s campaign against billionaire influence. The newly elected senator called for more regulations and for companies to pay for the electricity infrastructure they require and for communities to have a say in new projects, to to prevent residents from bearing all the costs.</p>
                <p>Trump’s response was extremely firm at first but suddenly shifted after the election. Before the results, he warned that he would veto Democratic bills if the party took control of Congress. After the Democrats’ victory, he claimed that “they did a good job” and said he was open to working together, while keeping the veto on the table. His remarks combined an offer to negotiate with a warning that he would block legislation he opposed.</p>
                <p>Republican leaders struck a more confrontational tone. Senate Republican leader John Thune said Republicans would resist Democratic efforts to reverse the party’s achievements, saying that Republican senators “will not stand idly by&quot;. Trump, meanwhile, distanced himself from the losses, blaming some Republican candidates and arguing that voters had not rejected him personally.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">What exactly will the new majority in Congress be able to do now?</h2>
                <p>Taking control of both chambers gives Democrats the ability to block bills proposed by the administration, leveraging the debt ceiling vote to force Trump into federal budget negotiations, block the appointments of administration officials, judges and justices, launch congressional investigations, subpoena administration officials for hearings, and request and publish documents.</p>
                <p>But control of Congress does not give Democrats control of the executive branch. Trump remains president and can veto bills. Article I, Section 7, Clause 2 of the Constitution states: “If he approve he shall sign it, but if not he shall return it, with his Objections”. Congress needs a two-thirds vote in both chambers to override a veto, a supermajority that Democrats do not hold.</p>
                <p>The result, therefore, gives them tools to block, investigate, and negotiate, but it does not guarantee that their full programme will become law.</p>
                <p>Trump’s sudden openness to cooperation may be less a change of heart than a response to the new balance of power. Future military spending will require congressional support: in June, his administration requested 87.6 billion dollars in additional funding, much of it for costs linked to the Iran war. A more conciliatory tone could help him negotiate over future budgets, though there is no evidence this explains his change in tone. Democrats have also promised investigations into the administration’s handling of the Epstein files and Trump family business dealings. That scrutiny may add to the political pressure he faces, but no evidence shows that he offered cooperation to avoid an investigation.</p>
                <p>Will this Democratic victory change the course of Trump’s final two years in office? And what might a divided Washington mean for Europe and the rest of the world? We will begin to find out just in January, when the newly elected members of Congress take office.</p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— Lorenza Pavone</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
