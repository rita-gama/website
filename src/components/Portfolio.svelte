<script lang="ts">
  import { academic } from "@content/projects.json";
  import skills from "@content/skills.json";
  let { title = "Portfolio" }: { title?: string } = $props();
  const projects: Record<string, any> = { academic };
  const icons = import.meta.glob("../icons/tech/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  let scrollPositions = $state<Record<string, { left: number; width: number }>>({});
</script>

<section
  id={title.toLowerCase()}
  class="px-2 py-3 bg-white border-2 rounded-2xl border-mist-200 dark:border-mist-800 dark:bg-mist-950"
>
  <h2 class="pl-3 mb-1 text-xl font-semibold text-black dark:text-white">
    {title}
  </h2>
  
  {#each Object.entries(projects) as [section, sectionprojects], i}
    {@const items = Object.entries(sectionprojects)}
    {@const pos = scrollPositions[section] || { left: 0, width: 1 }}
    {@const activePage = Math.round(pos.left / (pos.width || 1))}

    <div id={section}>
      <h3 class="pl-3 text-mist-500 text-[13px] font-medium pb-0.75 capitalize {i === 0 ? '' : 'border-t border-mist-200 dark:border-mist-800 pt-1.5'}">
        {section}
      </h3>
      <div class="relative">
        <div class="absolute top-0 bottom-0 left-0 z-10 w-3 h-full bg-white pointer-events-none dark:bg-mist-950">
        </div>
        <div class="absolute top-0 bottom-0 right-0 z-10 w-3 h-full bg-white pointer-events-none dark:bg-mist-950">
        </div>
        {let el = undefined}
        <div
          bind:this={el}
          onscroll={(e) => {
            const target = e.currentTarget as HTMLElement;
            scrollPositions[section] = { left: target.scrollLeft, width: target.clientWidth };
          }}
          class="grid grid-rows-1 grid-flow-col auto-cols-[100%] xs:auto-cols-[50%] md:auto-cols-[50%] overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
        >
          {#each Object.entries(sectionprojects as Record<string, any>) as [title, project], j}
            {@const icon = icons["../icons/tech/" + project.icon]}
            <div
              class="snap-start border-mist-200 dark:border-mist-800 pb-1.5 px-3 border-l"
            >
              <div
              class="group underline-offset-[1.5px] hover:opacity-90 hover:-translate-y-px hover:translate-x-px"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class=""
              >
                <div class="flex items-center justify-between">
                  {#if title}
                    <span
                      class="group-hover:underline inline-flex items-center gap-1.25 text-black dark:text-white"
                    >
                      <div class="w-4 h-4">
                        {@html icon}
                      </div>
                      <h4 class="pb-px text-sm font-semibold">
                        {title}
                      </h4>
                    </span>
                  {/if}
                  {#if project.time}
                    <span class="text-[10.5px] text-mist-500">{project.time}</span
                    >
                  {/if}
                </div>
                {#if project.description}
                  <p class="text-[11px] text-mist-800 dark:text-mist-200 pb-0.75">
                    {project.description}
                  </p>
                {/if}
              </a>
              {#if ["programming", "libraries", "tools"].some((sec) => (project[sec] ?? []).length > 0)}
                <div class="flex flex-wrap gap-1 py-0.75">
                  {#each ["programming", "libraries", "tools"] as sec}
                    {#each project[sec] ?? [] as tech}
                      {@const item = (skills as any)[sec][tech]}
                      {@const icon = icons["../icons/tech/" + item.icon]}
                      <div
                        style=" --color: {item.color};
                        --lightcolor: color-mix({item.color}, white 30%);
                        --darkcolor: color-mix(in srgb, {item.color}, black 15%)"
                        class="flex items-center justify-between gap-2 text-xs text-mist-700 dark:text-mist-300"
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.name}
                          class="flex items-center gap-1 transition hover:text-(--darkcolor) dark:hover:text-(--lightcolor) font-medium"
                        >
                          <div
                            class="h-3.5 w-3.5 p-px [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current"
                          >
                            {@html icon}
                          </div>
                        </a>
                      </div>
                    {/each}
                  {/each}
                </div>
              {/if}
            </div>
            </div>
          {/each}
        </div>
        {#if items.length > 2}
          {@const totalPagesDefault = items.length}
          {@const totalPagesXS = Math.ceil(items.length / 2)}
          {@const totalPagesMD = Math.ceil(items.length / 2)}
          
          <div class="flex justify-center gap-1.5 pt-3 pb-0.75">
            {#each Array(totalPagesDefault) as _, pageId}
              <button
                aria-label="Go to page {pageId + 1}"
                class="cursor-pointer h-2 rounded-full transition-all duration-300
                      {activePage === pageId ? 'w-3.5 bg-mist-600 dark:bg-mist-300' : 'w-2 bg-mist-300 dark:bg-mist-600'}
                      {pageId >= totalPagesXS ? 'xs:hidden' : ''}
                      {pageId >= totalPagesMD ? 'md:hidden' : ''}"
                onclick={() => {
                  if (el) {
                    el.scrollTo({
                      left: pageId * el.clientWidth,
                      behavior: "smooth"
                    });
                  }
                }}
              ></button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</section>