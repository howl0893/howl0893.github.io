<template>
    <body>
        <div id="doc" class="container-fluid markdown-body comment-enabled" data-hard-breaks="true">
            <br />
            <h1 style="margin-bottom: 7px">VOID</h1>
            <small style="float: left; color: #888"> 2023 Mar 05 </small>
            <!-- <small style="float: right; color: #888"><a href="/">Back</a></small> -->
            <br />
            <br />
            <br />

            <p>
                Follow, fork, or create a pull request here: <a href="https://github.com/hopeYouLikeGamminToo/void" target="_blank"><code>void</code></a>
                <br/> <br/>
                <code>void</code> is a project I started a few months ago after receiving a GitHub invite to collaborate on
                a project. A friend
                was interested in starting a coding project after seeing an up-tick in my GitHub activity. After some short
                discourse, we settled on creating a web browser multiplayer game. With the idea that one day it would be
                connected to a blockchain to feature in-game currency, digital collectibles, and NFT characters.
                <br /> <br />
                While the idea of such a game excited us all (there were 3 of us). There was much to learn. None of us had
                experience with the technologies it would take to complete such a game. We all got to learning, creating individual repositories to act 
                as a sandbox in a GitHub organization  where we would could experiement, play, and build castles. The repository I created got called 
                <code>void</code>. While struggling to come up with a name for the project, and not incredibly confident it would ever amount to anything,
                I typed <code>mkdir void</code> into my terminal. <code>void</code> because the created directory would be completely empty,
                but also because in computer programming langauges, such as C++, Java, and others, <code>void</code> is a keyword used to 
                indicate that a function or method does not return any value. Thus, giving me an out in the case that I wanted to abandon it forever.
                <br /> <br />
                Over the last several months the collaboration on the the project has dwindled. Despite this, I have
                continued to tinker away on <code>void</code> in my spare time (which mostly occurs on weekends before or after I hit the slopes). 
                While it isn't anywhere near complete or abandoned, I've made some progress on it. The current state of the game uses 
                <a href="https://pixijs.com/" target="_blank">PixiJS</a> for 2D rendering, <a href="https://brm.io/matter-js/" target="_blank">matter.js</a>
                for the physics engine, and <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API" target="_blank">WebRTC</a> for multiplayer
                and chat functionality. Here is a gif that depicts most of the functionality to date:

            </p>
            <br/>
            <figure>
                <img src="../assets/void/demo.gif" width="100%" />
                <figcaption>
                    demo highlighting current state of <code>void</code>
                </figcaption>
            </figure>
            <br/>
            <figure>
                <img src="../assets/void/honest-work.jpg" width="60%"/>
                <figcaption>
                    Me
                </figcaption>
            </figure>
            <br/>
            <figure class="inline-fig">
                <img src="../assets/void/kraken-sketch.jpeg"/>
                <figcaption>
                    artists sketch of kraken
                </figcaption>
            </figure>
            <figure class="inline-fig">
                <img src="../assets/void/kraken-headshot-transparent.png" width="50%"/>
                <figcaption>
                    kraken headshot
                </figcaption>
            </figure>
            <br/>
            <p>
                Suspect M.O.
                <br/>
                Going by the nickname of Kraken, this suspect lurks in the shadows. There are rumors circulating that he has a name, 
                & it's definitely not Kraken. If you happen upon this sea creature take careful watch. He might disappear in the blink of an eye. 

            </p>
            <br/>
            <figure class="inline-fig">
                <img src="../assets/void/glonky-sketch.jpg"/>
                <figcaption>
                    artists sketch of glonky
                </figcaption>
            </figure>
            <figure class="inline-fig">
                <img src="../assets/void/glonky-headshot-transparent.png" width="47%" />
                <figcaption>
                    glonky headshot
                </figcaption>
            </figure>
            <br/>
            <p>
                Suspect M.O.
                <br/>
                Formerly known as Edward, this suspect has since grown out his hair and now goes by the name of Glonky. 
                Not much is known about his habits or whereabouts aside from the fact that he leaves behind a trail of cigarettes and booze. 
                Be cautious when inflicting damage. At a certain point, he will lose his shell and run about mad and fast. You'd be lucky to 
                catch him when he's naked.
                <br/>
                To date, the only evidence on file is this <a href="https://youtu.be/4_X1rhOq6BU" target="_blank"> video</a>.
            </p>
            <br/>
        </div>
    </body>
</template>
  
<script>
</script>
  
<style lang="css" scoped>
@import "styles.css";

img {
    border-radius: 2%;
}

figcaption {
    font-size: 0.8em;
    color: #666;
}

.inline-fig {
  display: inline-block;
  max-width: 45%;
  margin-right: 5%;
}

.inline-fig img {
  max-width: 100%;
  height: auto;
  border-radius: 2%;
}

code {
    color: #808080;
    /* Change font color to red */
    /* background-color: lightgrey; */
    /* Change background color to light grey */
    padding: 5px;
    /* Add some padding for readability */
}
</style>