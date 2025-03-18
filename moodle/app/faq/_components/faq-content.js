"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, LineChart, Lock, User } from "lucide-react";

export default function FaqContent() {
  return (
    <Tabs defaultValue="account" className="w-full ">
      <TabsList className="grid w-full grid-cols-4 mb-8 bg-indigo-50">
        <TabsTrigger value="account" className="flex gap-2 items-center">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger value="tracking" className="flex gap-2 items-center">
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">Mood Tracking</span>
        </TabsTrigger>
        <TabsTrigger value="features" className="flex gap-2 items-center">
          <LineChart className="h-4 w-4" />
          <span className="hidden sm:inline">Features</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex gap-2 items-center">
          <Lock className="h-4 w-4" />
          <span className="hidden sm:inline">Privacy</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="mt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I create an account?</AccordionTrigger>
            <AccordionContent>
              <p>To create an account:</p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-2">
                <li>
                  Click on the &quot;Sign Up&quot; button in the top right
                  corner of the homepage
                </li>
                <li>Enter your email address and create a password</li>
                <li>Click &quot;Create Account&quot;</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How do I log in to my account?</AccordionTrigger>
            <AccordionContent>
              <p>To log in to your account:</p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-2">
                <li>
                  Click on the &quot;Log In&quot; button in the top right corner
                </li>
                <li>Enter your email address and password</li>
                <li>Click &quot;Log In&quot;</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can I change my email address or password?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                No, currently you cannot change your email address or password.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How do I delete my account?</AccordionTrigger>
            <AccordionContent>
              <p>Currently there is no way to delete an account</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="tracking" className="mt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I log my daily mood?</AccordionTrigger>
            <AccordionContent>
              <p>You can log your daily mood from the dashboard:</p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-2">
                <li>Log in to your account</li>
                <li>On the dashboard, you&apos;ll see a calendar heatmap</li>
                <li>
                  Select your mood from the options: Cheerful, Happy, Normal,
                  Angry, Sad, or Depressed
                </li>
                <li>Click &quot;Save&quot; to record your mood</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I edit or delete a mood entry?
            </AccordionTrigger>
            <AccordionContent>
              <p>Yes, you can edit or delete daily mood entry only</p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-2">
                <li>Go to the dashboard calendar</li>
                <li>
                  To edit: Change the mood selection click on a new mood
                  &quot;Update&quot;
                </li>
              </ol>
              <p className="mt-2">
                Note: Editing entries will affect your mood statistics.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I log moods for past dates?</AccordionTrigger>
            <AccordionContent>
              <p>No, you can not log moods for past dates</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              What do the different mood colors mean?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The colors on the calendar heatmap represent different moods:
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(150 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Cheerful</strong> - Feeling extremely positive and
                    joyful
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(120 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Happy</strong> - Feeling good and content
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(200 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Normal</strong> - Feeling neutral or average
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(0 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Angry</strong> - Feeling frustrated or irritated
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(240 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Sad</strong> - Feeling down or unhappy
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: "hsl(270 60% 50%)" }}
                  ></div>
                  <span>
                    <strong>Depressed</strong> - Feeling very low or hopeless
                  </span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="features" className="mt-0 max-w-xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the calendar heatmap work?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The calendar heatmap provides a visual representation of your
                mood over time:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>Each day is represented by a colored square</li>
                <li>The color corresponds to your mood for that day</li>
                <li>Days without entries appear in a lighter shade</li>
              </ul>
              <p className="mt-2">
                The calendar view makes it easy to spot patterns in your mood
                over time.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              What are mood streaks and how are they tracked?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Mood streaks track consecutive days with similar mood patterns:
              </p>
              <p className="mt-2">
                Your current streak is displayed on the dashboard. Streaks are
                broken if:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>You miss logging a day</li>
              </ul>
              <p className="mt-2">
                Streaks motivate you to maintain positive moods.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              What statistics and charts are available?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The Statistics page offers several visualizations to help you
                understand your mood patterns:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>
                  <strong>Monthly Mood Distribution (Pie Chart)</strong> - Shows
                  the proportion of different moods in a month
                </li>
                <li>
                  <strong>Mood Trends (Line Chart)</strong> - Displays how your
                  mood changes over time
                </li>
                <li>
                  <strong>Mood by Day of Week (Bar Chart)</strong> - Reveals
                  which days of the week tend to have better or worse moods
                </li>
                <li>
                  <strong>Mood by Month (Bar Chart)</strong> - Shows your
                  average mood for each month
                </li>

                <li>
                  <strong>Mood Distribution (Radar Chart)</strong> - Shows the
                  frequency pattern of different moods
                </li>
                <li>
                  <strong>Mood Streaks Chart</strong> - Visualizes consecutive
                  days with similar moods
                </li>
                <li>
                  <strong>Month-to-Month Comparison</strong> - Compares mood
                  patterns between last two months
                </li>
              </ul>
              <p className="mt-2">
                You can filter these visualizations by year and month to focus
                on specific time periods.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="privacy" className="mt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is my mood data stored and protected?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We take the security and privacy of your mood data very
                seriously:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>All data is encrypted both in transit and at rest</li>
                <li>
                  Your mood data is stored in secure databases with regular
                  backups
                </li>
                <li>
                  We use industry-standard security practices to protect your
                  information
                </li>
                <li>
                  Your data is never shared with third parties without your
                  explicit consent
                </li>
                <li>
                  You can delete your data at any time from your account
                  settings
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Who can see my mood data?</AccordionTrigger>
            <AccordionContent>
              <p>
                By default, your mood data is private and only visible to you.
                You have complete control over who can access your information:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>
                  Only you can see your detailed mood entries and statistics
                </li>
                <li>
                  You can optionally share specific statistics or reports with
                  others via a secure link
                </li>
                <li>
                  If you choose to participate in research, your data will be
                  anonymized
                </li>
                <li>
                  Our staff cannot access your individual mood data except in
                  limited circumstances for technical support (with your
                  permission)
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Is my mood data used for research?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We only use your data for research if you explicitly opt in:
              </p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>
                  During registration, you can choose whether to participate in
                  anonymous research
                </li>
                <li>
                  If you opt in, your data will be anonymized (all personally
                  identifiable information removed)
                </li>
                <li>
                  Research helps us improve the app and better understand mood
                  patterns
                </li>
                <li>You can opt out at any time in your privacy settings</li>
              </ul>
              <p className="mt-2">
                We never sell your data to third parties, even in anonymized
                form.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              What data does the app collect besides my mood entries?
            </AccordionTrigger>
            <AccordionContent>
              <p>Besides your mood entries, we collect:</p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>
                  <strong>Account information</strong> - Email address and
                  encrypted password
                </li>
                <li>
                  <strong>Usage data</strong> - How often you use the app and
                  which features you use
                </li>
                <li>
                  <strong>Device information</strong> - Browser type, operating
                  system, and screen size (to optimize your experience)
                </li>
              </ul>
              <p className="mt-2">We do not collect:</p>
              <ul className="list-disc ml-5 mt-2 flex flex-col gap-2">
                <li>Your precise location</li>
                <li>Your contacts or address book</li>
                <li>Information from other apps on your device</li>
              </ul>
              <p className="mt-2">
                You can view our complete privacy policy for more details.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}
