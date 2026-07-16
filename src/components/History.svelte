<script lang="ts">
  import { concepts } from "@content/skills.json";
  import { dark } from "../theme.js";
  let {
    title = "History",
    history,
    headingClass,
  }: { title?: string; history: any; headingClass?: string } = $props();
  const icons = import.meta.glob("../icons/**/*.svg", {
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
  <div>
    {#each Object.values(history as Record<string, any>) as hist, i}
      <div
        style=" --color: {hist.color};
                        --lightcolor: color-mix({hist.color}, white 20%);
                        --darkcolor: color-mix(in srgb, {hist.color}, black 10%)"
      >
        <div
          class={`flex gap-2.5 ${
            i === 0
              ? "pt-1"
              : "mt-2 border-t border-mist-200 dark:border-mist-800 pt-2"
          }`}
        >
          {#if hist.logo}
            <a href={hist.logourl} target="_blank" rel="noopener noreferrer">
              <img
                class="shrink-0 h-12 min-w-12 max-w-12 rounded-lg object-contain transition hover:opacity-80 dark:bg-(--darkcolor)/90"
                src={$dark
                  ? "../images/dark/" + hist.logo
                  : "../images/light/" + hist.logo}
                alt={hist.logoalt}
              />
            </a>
          {/if}
          <div class="min-w-0 grow">
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex flex-col pt-px">
                {#if hist.title}
                  <h3
                    class="text-base font-semibold text-black transition dark:text-white hover:opacity-80"
                  >
                    <a
                      href={hist.titleurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hist.title}
                    </a>
                  </h3>
                {/if}
                {#if hist.subtitle}
                  <h4
                    class="text-sm font-medium text-mist-800 dark:text-mist-200"
                  >
                    <a
                      href={hist.subtitleurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="transition hover:opacity-80"
                    >
                      {hist.subtitle}
                    </a>
                  </h4>
                {/if}
              </div>
              <div class="justify-center text-sm text-mist-500 sm:text-right">
                {#if hist.time}
                  <h5 class="sm:pt-1">
                    {hist.time}
                  </h5>
                {/if}
                {#if hist.location}
                  <h5>{hist.location}</h5>
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div class={headingClass}>
          {#if hist.heading}
            <h6
              class="text-xs font-medium text-mist-600 dark:text-mist-400 {hist.concepts &&
              hist.concepts.length > 0
                ? 'pt-px pb-0.75'
                : 'pt-0.5'}"
            >
              {#if hist.headingurl}
                <a
                  href={hist.headingurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition hover:opacity-80"
                >
                  {hist.heading}
                </a>
              {:else}
                {hist.heading}
              {/if}
            </h6>
          {/if}
        </div>
        <div class="xs:pl-14.5">
          {#if hist.concepts}
            <div class="flex flex-wrap gap-2 py-0.75">
              {#each hist.concepts as concept}
                <button
                  type="button"
                  class="group relative inline-block rounded-full border border-(--darkcolor)/33 dark:border-(--lightcolor)/33 bg-(--lightcolor)/7.5 dark:bg-(--darkcolor)/10 text-(--darkcolor) dark:text-(--lightcolor) px-2 pt-0.5 pb-[3.5px] text-[11px] font-medium cursor-help focus:outline-none text-left appearance-none"
                >
                  {concepts[concept as keyof typeof concepts]?.name}
                </button>
              {/each}
            </div>
          {/if}
          {#if hist.description}
            <p class="py-0.75 text-xs text-mist-800 dark:text-mist-200">
              {hist.description}
            </p>
          {/if}
          {#if hist.media}
            <div
              class="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 py-0.75 w-full"
            >
              {#each hist.media as media}
                {@const icon = icons["../icons/" + media.icon]}
                {#if media.url}
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-[11px] font-medium text-(--darkcolor) dark:text-(--lightcolor) hover:opacity-90 underline-offset-[1.5px] hover:underline hover:-translate-y-px hover:translate-x-px"
                  >
                    <div class="w-3 h-3 shrink-0 [&_svg]:h-full [&_svg]:w-full">
                      {@html icon}
                    </div>
                    <span>{media.title}</span>
                  </a>
                {:else}
                  <span
                    class="flex items-center gap-1 text-[11px] font-medium text-(--darkcolor) dark:text-(--lightcolor)"
                  >
                    <div class="w-3 h-3 shrink-0 [&_svg]:h-full [&_svg]:w-full">
                      {@html icon}
                    </div>
                    <span>{media.title}</span>
                  </span>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>
