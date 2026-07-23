<script lang="ts">
  import skills from "@content/skills.json";
  let { title = "Skills" }: { title?: string } = $props();
  const sections = ["programming", "libraries", "tools"] as const;
  const icons = import.meta.glob("../icons/tech/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });
</script>

<section
  id={title.toLowerCase()}
  class="px-5 py-3 bg-white border-2 rounded-2xl border-mist-200 dark:border-mist-800 dark:bg-mist-950"
>
  <h2 class="mb-1 text-xl font-semibold text-black dark:text-white">
    {title}
  </h2>
  <!-- Concepts -->
  <div id="concepts" class="gap-0.75 pb-0.75 flex flex-col">
    <h3 class="text-mist-500 text-[13px] font-medium">Concepts</h3>
    {#each Object.values(skills.concepts)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name)) as concept}
      <a
        href={concept.url}
        target="_blank"
        rel="noopener noreferrer"
        class="hover:opacity-90"
      >
        <p
          class="underline-offset-[1.5px] hover:underline hover:-translate-y-px hover:translate-x-px text-xs text-mist-800 dark:text-mist-200"
        >
          {concept.name}
        </p>
      </a>
    {/each}
  </div>
  <!-- Programming, Libraries, Tools -->
  {#each sections as section}
    <div
      id={section}
      class="gap-0.75 pb-0.75 flex flex-col border-t border-mist-200 dark:border-mist-800 pt-1 mt-1.5"
    >
      <h3 class="text-mist-500 text-[13px] font-medium capitalize">
        {section}
      </h3>
      {#each Object.values(skills[section])
        .filter((item) => item.level > 0)
        .sort((a, b) => b.level - a.level) as item}
        {@const icon = icons["../icons/tech/" + item.icon]}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style=" --color: {item.color};
              --lightcolor: color-mix({item.color}, white 30%);
              --darkcolor: color-mix(in srgb, {item.color}, black 15%)"
          class="font-medium flex items-center justify-between gap-2 text-xs text-mist-700 dark:text-mist-300 hover:text-(--darkcolor) dark:hover:text-(--lightcolor)"
        >
          <div class="flex items-center">
            <div
              class="mr-1 h-3.5 w-3.5 p-px [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current"
            >
              {@html icon}
            </div>
            <p>{item.name}</p>
          </div>
          <div class="flex gap-1 text-right">
            {#each { length: 5 } as _, i}
              <div
                class="w-2 h-2 rounded-full"
                class:bg-(--darkcolor)={i < item.level}
                class:dark:bg-(--lightcolor)={i < item.level}
                class:bg-mist-200={i >= item.level}
                class:dark:bg-mist-800={i >= item.level}
              ></div>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  {/each}
  <!-- Languages -->
  <div
    id="languages"
    class="gap-0.75 pb-0.75 flex flex-col border-t border-mist-200 dark:border-mist-800 pt-1 mt-1.5"
  >
    <h3 class="text-mist-500 text-[13px] font-medium">Languages</h3>
    {#each Object.values(skills.languages) as item}
      <p
        class="flex items-center justify-between text-xs text-mist-700 dark:text-mist-200"
      >
        <span class="font-medium">{item.name}</span>
        <span class="text-right">{item.level}</span>
      </p>
    {/each}
  </div>
</section>
