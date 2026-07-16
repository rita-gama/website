<script lang="ts">
  import Button from "@components/Button.svelte";
  import Theme from "@components/Theme.svelte";
  import Profile from "@components/Profile.svelte";
  import Contact from "@components/Contact.svelte";
  import Skills from "@components/Skills.svelte";
  import Projects from "@components/Projects.svelte";
  import History from "@components/History.svelte";
  import Portfolio from "@components/Portfolio.svelte";
  import Volunteering from "@components/Volunteering.svelte";
  import Footer from "@components/Footer.svelte";

  import contact from "@content/contact.json";
  import profiles from "@content/profiles.json";
  import education from "@content/education.json";
  import experience from "@content/experience.json";
  import profile from "@content/profile.json";

  import house from "@icons/ui/house.svg?raw";
  import printer from "@icons/ui/printer.svg?raw";
  import codexml from "@icons/ui/codexml.svg?raw";

  function printPage() {
    if (typeof window !== "undefined" && window.print) {
      window.print();
    }
  }
</script>

<div class="min-h-screen p-5 bg-mist-50 dark:bg-mist-900">
  <div class="max-w-5xl mx-auto space-y-4">
    <!-- Buttons -->
    <div class="relative flex justify-center gap-4 print:hidden">
      <div class="absolute left-0">
        <Button
          id="back"
          ariaLabel="Go home"
          icon={house}
          iconClass="p-px"
          title="Go home"
          titleClass="hidden lg:block"
          onclick={() => window.location.assign("/")}
        />
      </div>
      <Theme iconClass="p-px" />
      <div class="absolute right-0 flex gap-4">
        <Button
          id="code"
          ariaLabel="View source code"
          icon={codexml}
          title="View source code"
          titleClass="hidden lg:block"
          onclick={() =>
            window.open(
              "https://github.com/jjasferreira/website",
              "_blank",
              "noopener,noreferrer",
            )}
        />
        <Button
          id="print"
          ariaLabel="Print resume"
          icon={printer}
          iconClass="p-px"
          title="Print resume"
          titleClass="hidden lg:block"
          onclick={printPage}
        />
      </div>
    </div>

    <Profile />

    <!-- lg--- -->
    <div class="hidden space-y-4 lg:block">
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1 space-y-4">
          <Contact {contact} />
          <Skills />
          <Projects />
          <Contact title="Profiles" contact={profiles} />
        </div>
        <div class="col-span-3 space-y-4">
          <History
            title="Experience"
            history={experience}
            headingClass="xs:pl-14.5"
          />
          <History
            title="Education"
            history={education}
            headingClass="pl-14.5"
          />
          <Portfolio />
          <Volunteering />
        </div>
      </div>
    </div>

    <!-- md-lg -->
    <div class="hidden space-y-4 md:block lg:hidden">
      <div class="grid grid-cols-3 gap-4">
        <div class="space-y-4">
          <Contact {contact} />
          <Contact title="Profiles" contact={profiles} />
        </div>
        <Skills />
        <div class="space-y-4">
          <Projects />
        </div>
      </div>
      <History
        title="Experience"
        history={experience}
        headingClass="xs:pl-14.5"
      />
      <History title="Education" history={education} headingClass="pl-14.5" />
      <Portfolio />
      <Volunteering />
    </div>

    <!-- sm-md -->
    <div class="hidden space-y-4 sm:block md:hidden">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-4">
          <Contact contact={{ ...contact, ...profiles }} />
          <Projects />
        </div>
        <Skills />
      </div>
      <History
        title="Experience"
        history={experience}
        headingClass="xs:pl-14.5"
      />
      <History title="Education" history={education} headingClass="pl-14.5" />
      <Portfolio />
      <Volunteering />
    </div>

    <!-- ---sm -->
    <div class="block space-y-4 sm:hidden">
      <Contact {contact} />
      <Skills />
      <History
        title="Experience"
        history={experience}
        headingClass="xs:pl-14.5"
      />
      <Projects />
      <History title="Education" history={education} headingClass="pl-14.5" />
      <Portfolio />
      <Volunteering />
      <Contact title="Profiles" contact={profiles} />
    </div>

    <Footer text={profile.fullname} />
  </div>
</div>
