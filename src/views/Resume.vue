<template>
  <div id="resumeHolder">
    <button @click="print">print</button>
    <div id="resumePrint">
    <div id="resume">
      <div id="resumeTop" class="dark">
        <div id="resumeName">
          <h3>Benjamin Russell</h3>
          <div class="line bg"></div>
        </div>
        <div id="resumeLogoHolder">
          <h2>logo</h2>
          <div class="line bg"></div>
        </div>
      </div>
      <div id="resumeBody">
        <div id="resumeContact">
          <div id="contactInfo">
            <h3>Contact</h3>
            <p>e-mail:</p>
            <p>website:</p>
          </div>
        </div>
        <div id="deviderLine">
          <div class="dualLineHolder">
            <div class="halfline bg"></div>
            <div class="halfline dark"></div>
          </div>
        </div>
        <div id="resumeSkills" class="dark">
          <div class="line bg"></div>
          <div id="resumeSkillsContent">
            <h3>Skills</h3>
          </div>
        </div>
        <div id="resumeExperience">
          <div>
            <h3>Experience</h3>
            <h5>Hoglund Advertising and Analytics 2019 - Present</h5>
            <ul>

            </ul>
          </div>
          <div class="dualLineHolder">
            <div class="halfline bg"></div>
            <div class="halfline dark "></div>
          </div>
        </div>

        <div id="resumeAbout">
          <h3>
            About
          </h3>
        </div>
      </div>
      <div id="resumeFooter"></div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Resume",
  methods:{
    print(){
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }
      const prtContent = document.querySelector("#resumePrint");
      const winPrint = window.open(
        "",
        "",
        "left=0,top=0,width=612,height=792,toolbar=0,scrollbars=0,status=0"
      );
        const printHtml = prtContent?.innerHTML;
        winPrint?.document.write(`
        <!DOCTYPE html>
          <html lang="en">
            <head>
              ${stylesHtml}
            </head>
            <body>
               ${printHtml}
            </body>
          </html>
        `);
        winPrint?.document.close();
        winPrint?.focus();
        winPrint?.print();
        // winPrint?.close();
     
    }
  }
};
</script>

<style scoped lang="scss">

.bg {
  background: linear-gradient(to right, #0c64b0, #04bc95) fixed;
}
.dark {
  background: hsl(208, 13%, 23%);
}
.line {
  width: 100%;
  height: 6px;
}
.dualLineHolder {
  .halfline {
    display: grid;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 3px;
  }
}

#resumeHolder {
  display: grid;
  justify-items: center;
}
#resumePrint{
  box-shadow: 0 0 5px 3px black;
}
#resume {
  -webkit-print-color-adjust: exact;
  display: grid !important;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 1rem;
  width: 8.5in;
  height: 11in;
  background: white;
  color: hsl(208, 13%, 23%);
}
#resumeBody {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto 1fr auto;
  grid-column-gap: 1rem;
  padding: 2rem;
  box-sizing: border-box;
}
#resumeTop {
  box-sizing: border-box;
  color: white;
  grid-column-gap: 1rem;
  display: grid;
  padding: 8rem 1rem 1rem 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  align-self: start;
  #resumeName {
    grid-column: span 2;
  }
  #resumeLogo {
  }
}
#resumeContact {
  grid-column: span 3;
  #contactInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
#deviderLine {
  grid-column: span 2;
}
#resumeExperienceTitle {
  grid-column: span 3;
}
#resumeExperience {
  grid-column: span 2;
}
#resumeSkills {
  grid-row: span 3;
  color: white;
  #resumeSkillsContent {
    padding: 1rem;
  }
}
</style>
