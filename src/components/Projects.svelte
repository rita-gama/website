<script lang="ts">
  import { contributions, personal } from "@content/projects.json";
  import skills from "@content/skills.json";
  let { title = "Projects" }: { title?: string } = $props();
  const projects = {
    contributions: contributions,
    personal: personal,
  };
  const icons = import.meta.glob("../icons/tech/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });
</script>

<section
  id={title.toLowerCase()}
  class="px-5 pt-3 pb-1.5 bg-white border-2 rounded-2xl border-mist-200 dark:border-mist-800 dark:bg-mist-950"
>
  <h2 class="mb-1 text-xl font-semibold text-black dark:text-white">
    {title}
  </h2>

  {#each Object.entries(projects as Record<string, any>) as [section, sectionprojects], i}
    <div id={section}>
      <h3
        class="text-mist-500 text-[13px] font-medium pb-0.75 capitalize {i === 0
          ? ''
          : 'border-t border-mist-200 dark:border-mist-800 pt-1'}"
      >
        {section}
      </h3>
      {#each Object.entries(sectionprojects as Record<string, any>) as [title, project], j}
        {@const icon = icons["../icons/tech/" + project.icon]}
        <div
          class="border-mist-200 dark:border-mist-800 pb-1.5 {j === 0
            ? 'pt-0'
            : 'border-t pt-2'}"
        >
          <div
            class="group hover:opacity-90 underline-offset-[1.5px] hover:-translate-y-px hover:translate-x-px"
          >
            <a href={project.url} target="_blank" rel="noopener noreferrer">
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
                  <span class="text-[10.5px] text-mist-500 hover:no-underline"
                    >{project.time}</span
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
  {/each}
</section>
