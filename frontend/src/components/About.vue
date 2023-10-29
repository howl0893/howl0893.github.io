<template>
    <body>
        <div id="doc" class="container-fluid markdown-body comment-enabled" data-hard-breaks="true">
            <br />
            <h1>Matthew Howlett</h1>
            <small> 2023 Oct 28 </small>
            <!-- <small style="float: right; color: x#888"><a href="/">Back</a></small> -->

            <br />
            <br />

            <section class="contact">
                <img class="blog-img" src="../assets/about/headshot.png" />
                <div class="top-section">
                    <h4>Research Scientist | Engineer</h4>
                </div>
                <div class="contact-info">
                    <p>Minturn, Colorado, United States</p>
                    <a href="mailto:matt.r.howlett@gmail.com" target="_blank">Email</a>
                    <a href="https://www.linkedin.com/in/matthew-howlett-5b9131b2/" target="_blank">LinkedIn</a>
                    <a href="https://github.com/howl0893" target="_blank">GitHub</a>
                </div>
            </section>

            <section class="about">
                <h5 class="bio-header">Bio</h5>
                <p>
                    As a Research Scientist | Engineer with a bachelor's in engineering physics, I have a solid skill set in
                    sensor design, full-stack web development, and embedded systems, backed by years of impactful work at
                    Michigan Aerospace. With a passion for research, I've led software development for cutting-edge
                    atmospheric LiDAR projects, using machine learning and robotic systems. I am a motivated individual who
                    thrives in a collaborative or remote setting, driven by a relentless curiosity to solve complex
                    problems. Currently, I’m focusing on improving my skills in deep learning and data analytics to advance
                    my career. </p>
                <p>
                    I've been living in the Colorado Rockies for around three years. In my spare time I enjoy escaping into
                    the mountains. They offer my mind clarity and moving about them is great way to exercise. I usually
                    bring
                    along my mountain bike or snowboard,
                    but all you really need to bring is yourself. The mountains will do the rest.
                </p>
            </section>

            <section class="my-playlist">
                <h5>Playlist</h5>
                <div class="spotify-container">
                    <iframe class="spotify"
                        src="https://open.spotify.com/embed/playlist/3PNZmgowCUyoFMhMp1lOt2?si=cc937a4207904739?utm_source=generator&theme=0&autoplay=1&t=0s"
                        width="600" height="350" frameBorder="0" allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>
                </div>
            </section>

            <section class="skills">
                <h5>Skills</h5>
                <p class="tab-delimited">Python&emsp;Javascript&emsp;C++&emsp;Linux&emsp;ARM Cortex
                    M-series&emsp;VueJS&emsp;PostgreSQL&emsp;Control Systems&emsp;Deep Learning</p>
            </section>

            <section class="projects">
                <h5>Personal Projects</h5>
                <div class="project-cards">
                    <div class="project-card" @click="emitActiveComponent('Robotics')">
                        <i class="fa-solid fa-robot project-icon">&nbsp;&nbsp;&nbsp;&nbsp;Robots</i>
                        <!-- <h6>Robotics</h6> -->
                        <br />
                        <br />
                        <p>More details on the things I've built in my spare time.</p>
                    </div>
                    <div class="project-card" @click="navigateTo('wisdom-tree')">
                        <i class="fa-solid fa-tree project-icon">&nbsp;&nbsp;&nbsp;&nbsp;Widsom Tree</i>
                        <!-- <h6>Wisdom Tree</h6> -->
                        <br />
                        <br />
                        <p>A browser-based daily word game inspired by Wordle.</p>
                    </div>
                    <div class="project-card" @click="emitActiveComponent('Void')">
                        <i class="fa-solid fa-gamepad project-icon">&nbsp;&nbsp;&nbsp;&nbsp;void</i>
                        <!-- <h6>void</h6> -->
                        <br />
                        <br />
                        <p>A browser-based multiplayer game inspired by Super Smash Bros.</p>
                    </div>
                    <div class="project-card" @click="navigateTo('coming-soon')">
                        <i class="fa-solid fa-wrench project-icon">&nbsp;&nbsp;&nbsp;&nbsp;Coming Soon</i>
                        <!-- <h6>Coming Soon</h6> -->
                        <br />
                        <br />
                        <p>Another project is underway; check back here later for more details!</p>
                    </div>
                </div>
            </section>

            <section class="education">
                <h5>Education History</h5>
                <div class="card">
                    <h6>Kettering University</h6>
                    <small>2016 - 2019</small>
                    <h7>Degree: Bachelor's of Science</h7>
                    <h7>Major: Engineering Physics</h7>
                </div>
                <div class="card">
                    <h6>Grand Valley State University</h6>
                    <small>2014 - 2016</small>
                    <h7>Major: Product Manufacturing and Design</h7>
                </div>
            </section>

            <section class="work-experience">
                <h5>Work Experience</h5>
                <div class="card">
                    <h6>Michigan Aerospace Corporation</h6>
                    <h6>Research Scientist | Engineer</h6>
                    <small>Nov 2019 - Present (4 years)</small>
                    <ul>
                        <li>Developed control system software for advanced LiDAR systems like HALAS (High-Altitude Lidar
                            Atmospheric Sensing) and DroN2O (Drone-based Nitrous Oxide Emission Monitoring), enhancing and
                            enabling device interoperability, safety algorithms, and real-time data displays.</li>
                        <li>Researched and applied state-of-the-art deep-learning neural networks for optical flow and
                            object classification. Architected a comprehensive software pipeline for data preprocessing,
                            analysis, and sensor information extraction.</li>
                        <li>Led the embedded software development and PCB design for a 3D ultrasonic anemometer capable of
                            making high-speed wind and temperature measurements.</li>
                        <li>Contributed to the development of Reconn.AI by improving the prediction and classification
                            algorithms, user interface, and integrating a subscription-based payment model using Stripe API.
                        </li>
                        <li>Possess 5+ years of industry experience with a strong skill set in ARM Cortex M-series
                            processors, real-time control systems, circuit design, and multidisciplinary team leadership.
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Michigan Aerospace Corporation</h6>
                    <h6>Engineer Co-op</h6>
                    <small>Apr 2018 - Oct 2019 (1 year 7 months)</small>
                    <ul>
                        <li>Designed 1D ultrasonic anemometer PCB shield for ARM based microcontroller.</li>
                        <li>Wrote control system software in Python and LabView for laser-induced melanoma cell detection
                            via photoacoustic effect.</li>
                        <li>Utilized SolidWorks for 3D modeling and executed rapid prototyping via 3D printing.</li>
                    </ul>
                </div>
                <div class="card">
                    <h6>New Eagle </h6>
                    <h6>Engineer Co-op</h6>
                    <small>Sep 2016 - Jul 2017 (11 months)</small>
                    <ul>
                        <li>Contributed to mechanical and electrical design and assembly for multiple hybrid vehicle
                            projects.</li>
                        <li>Participated in a large-scale reverse engineering project for electronic control unit
                            replacement, focusing on CAN decryption, harness development, and software for I/O validation
                            and data acquisition.</li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Angelo Iafrate Construction</h6>
                    <h6>Laborer</h6>
                    <small>May 2014 - Jul 2016 (2 yrs 3 months)</small>
                </div>
                <div class="card">
                    <h6>College Works Painting</h6>
                    <h6>Branch Manager</h6>
                    <small>Feb 2015 - Aug 2015 (7 months)</small>
                    <ul>
                        <li>Generated and managed more than $50k in work over one summer.</li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Grass Guyz LLC</h6>
                    <h6>Co-owner | Manager</h6>
                    <small>May 2010 - Oct 2013 (3 years 6 months)</small>
                    <ul>
                        <li>Co-founded and managed a lawn care business, overseeing around 30 accounts.</li>
                    </ul>
                </div>
            </section>
        </div>
    </body>
</template>
  
<script>
export default {
    methods: {
        emitActiveComponent(project) {
            this.$emit('changeActiveComponent', project);
        },
        navigateTo(project) {
            switch (project) {
                case 'wisdom-tree':
                    window.open('http://wisdom-tree.netlify.app/', '_blank');
                    break;
                case 'coming-soon':
                    // Do nothing or show a tooltip
                    break;
                default:
                    console.log('Unknown project');
            }
        }
    }
}
</script>
  
<style lang="css" scoped>
@import "../styles/global.css";

.container-fluid {
    margin-top: -10px;
}

.blog-img {
    float: left;
    /* height: 14vw; */
    max-width: 23%;
    height: auto;
    margin-right: 3vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top-section {
    display: flex;
    align-items: flex-start;
}

h4,
.spotify {
    margin: 0;
}

.spotify-container {
    max-width: 600px;
}

.contact-info {
    margin-top: 15px;
}

.bio-header {
    margin-top: 180px;
}

.contact {
    margin-left: 6vw;
}

.contact a {
    margin-right: 15px;
    /* margin-left: 10px; */
}

.contact p {
    color: grey;
    /* padding-left: 20px; */
}

.skills .tab-delimited {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1em;
}

.container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    margin-bottom: 7px;
}

small {
    float: left;
    color: #888
}

.skills {
    margin-top: -190px;
}


.contact,
.about,
.work-experience,
.education,
.projects {
    margin-top: 0;
}

.project-icon {
    margin-left: 20px;
}

.project-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 4x4 grid */
    gap: 16px;
}

.project-card {
    background-color: inherit;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    /* Add transition for smooth scaling */
}

.project-card:hover {
    /* Fixed the typo from '.project-card :hover' to '.project-card:hover' */
    transform: scale(1.05);
    /* Scale the size of the element to 110% */
}

.project-card h6 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 18px;
}

.project-card p {
    font-size: 16px;
}


.card {
    background-color: inherit;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h6 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 18px;
}


.card ul {
    list-style-type: disc;
    margin-left: 20px;
    margin-top: 20px;
}


@media only screen and (max-width: 1700px) {
    .blog-img {
        max-width: 28%;
    }

    .bio-header {
        margin-top: 180px;

    }
}

@media only screen and (max-width: 1400px) {
    .blog-img {
        max-width: 35%;
    }

    .bio-header {
        margin-top: 200px;

    }
}

@media only screen and (max-width: 1200px) {
    .blog-img {
        max-width: 35%;
    }

    .bio-header {
        margin-top: 200px;

    }
}

@media only screen and (max-width: 1100px) {
    .blog-img {
        max-width: 45%;
    }

    .bio-header {
        margin-top: 160px;

    }
}

@media only screen and (max-width: 900px) {
    .blog-img {
        float: none;
        max-width: 70%;
        margin-bottom: 20px;
    }

    .bio-header {
        margin-top: 80px;

    }

    .project-cards {
        grid-template-columns: 1fr;
    }

    .spotify {
        width: 350px;
    }

    .container-fluid {
    margin-top: -50px;
    }
}



@media only screen and (max-width: 600px) {
    .blog-img {
        float: none;
        max-width: 50%;
        height: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .bio-header {
        margin-top: 50px;

    }

    .project-cards {
        grid-template-columns: 1fr;
    }

    .spotify {
        width: 320px;
    }

    .container-fluid {
    margin-top: -100px;
    }
}</style>

