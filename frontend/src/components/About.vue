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
                <h1 class="bio-header"></h1>
                <h5>Bio</h5>
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

            <section class="my-playlist" v-if="isSpotifyLoaded">
                <h5>Playlist</h5>
                <div class="spotify-container">
                    <iframe class="spotify" @error="isSpotifyLoaded = false"
                        src="https://open.spotify.com/embed/playlist/3PNZmgowCUyoFMhMp1lOt2?si=cc937a4207904739?utm_source=generator&theme=0&autoplay=1&t=0s"
                        width="600" height="350" frameBorder="0" allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>
                </div>
            </section>
            <div v-else>
                <br /><br /><br />
                <br /><br /><br /><br />
            </div>

            <section class="skills">
                <h5>Skills</h5>
                <p class="tab-delimited">Python&emsp;Javascript&emsp;C++&emsp;Linux&emsp;ARM Cortex
                    M-series&emsp;VueJS&emsp;PostgreSQL&emsp;Control Systems&emsp;Deep Learning</p>
            </section>

            <section class="work-experience">
                <h5>Work Experience</h5>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/michaero.jpeg" alt="Michigan Aerospace Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">Michigan Aerospace Corporation</h6>
                            <span class="title">Research Scientist | Engineer</span>
                            <small class="dates">Nov 2019 - Present (4 years)</small>
                        </div>
                    </div>
                    <ul>
                        <li>
                            Developed control system software for advanced LiDAR systems like
                            <a @click="toggleCard('HALAS')" class="dropdown-word"> HALAS
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.HALAS"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                            and
                            <a @click="toggleCard('DroN2O')" class="dropdown-word"> DroN2O
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.DroN2O"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                        </li>

                        <br />

                        <div v-if="expandedCards.HALAS">
                            <!-- <span>High Altitude Lidar Atmospheric sensing</span> -->
                            <p class="details">
                                The <a
                                    href="https://aerospace.honeywell.com/us/en/products-and-services/product/hardware-and-systems/weather-radar/honeywell-halas"
                                    target="_blank">
                                    High Altitude Lidar Atmospheric sensing <i
                                        class="fas fa-external-link-alt exp-details"></i>
                                </a> (HALAS) System is a ground and air-based, UV LIDAR and
                                Raman system for real-time, high-altitude measurement of wind velocity, direction, density,
                                temperature, and composition – O2, N2, and H2O mass fractions.
                            </p>
                            <p class="details">
                                Supporting data collection campaigns for this project took me to many places, including:
                                Hawaii, California, Virginia, Florida, Maine, and Minnesota.
                            </p>

                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.halas.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.halas.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="HALAS Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.halas.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.halas.index === index }"
                                        @click="goToSlide(index, 'halas')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>

                            <br />
                        </div>

                        <div v-if="expandedCards.DroN2O">
                            <br />
                            <p class="details">
                                A <a href="https://arpa-e.energy.gov/technologies/projects/dron2o-drone-based-system-measuring-nitrous-oxide-emissions-agricultural"
                                    target="_blank">
                                    Drone-Based System for Measuring Nitrous Oxide Emissions from Agricultural Fields <i
                                        class="fas fa-external-link-alt exp-details"></i>
                                </a> (DroN2O) is a system proposed to sense N2O emissions from agricultural fields using
                                laser-based sensors mounted on drones.
                                These sensors include an optical absorption cell, a short-range miniature wind LIDAR (LIght
                                Detection And Ranging),
                                and a camera for plant health and ground assessment. The measurements from these sensors are
                                combined and processed
                                with artificial intelligence-enabled software to accurately measure N2O emissions from a
                                given farm field during the entire growing season.
                            </p>

                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.drone.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.drone.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="Drone Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.drone.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.drone.index === index }"
                                        @click="goToSlide(index, 'drone')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>


                        <li>Researched and applied deep-learning neural networks for optical flow and object classification.
                        </li>

                        <br />

                        <li>Led the embedded software development and PCB design for a <a @click="toggleCard('Anemometer')"
                                class="dropdown-word"> 3D ultrasonic anemometer
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.Anemometer"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i>
                            </a> capable of making high-speed wind and temperature measurements.
                        </li>

                        <div v-if="expandedCards.Anemometer">
                            <br />
                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.anemometer3D.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.anemometer3D.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="anemometer3D Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.anemometer3D.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.anemometer3D.index === index }"
                                        @click="goToSlide(index, 'anemometer3D')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>


                        <br />

                        <li>Contributed to the development of <a @click="toggleCard('Reconn')" class="dropdown-word">
                                Reconn.AI
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.Reconn"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                            by improving the prediction and classification
                            algorithms, user interface, and integrating a subscription-based payment model using Stripe API.
                        </li>

                        <div v-if="expandedCards.Reconn">
                            <br />
                            <p class="details">
                                <a href="https://reconn.ai" target="_blank">Reconn.AI</a> is an all-in-one platform to
                                manage
                                and analyze camera trap images by leveraging user trained machine learning
                                algorithm to help classify any animal species.
                            </p>
                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.reconn.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.reconn.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="reconn Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.reconn.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.reconn.index === index }"
                                        @click="goToSlide(index, 'reconn')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>

                        <br />

                        <li>Possess 5+ years of industry experience with a strong skill set in ARM Cortex M-series
                            processors, real-time control systems, circuit design, and multidisciplinary team leadership.
                        </li>

                        <br />

                    </ul>
                </div>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/michaero.jpeg" alt="Michigan Aerospace Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">Michigan Aerospace Corporation</h6>
                            <span>Engineer Co-op</span>
                            <small>Apr 2018 - Oct 2019 (1 year 7 months)</small>
                        </div>
                    </div>

                    <ul>
                        <li>Designed <a @click="toggleCard('Anemometer1D')" class="dropdown-word"> 1D ultrasonic anemometer
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.Anemometer1D"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i>
                            </a> PCB shield for ARM based microcontroller.
                        </li>

                        <div v-if="expandedCards.Anemometer1D">
                            <br />
                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.anemometer1D.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.anemometer1D.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="anemometer1D Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.anemometer1D.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.anemometer1D.index === index }"
                                        @click="goToSlide(index, 'anemometer1D')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>

                        </div>

                        <br />

                        <li>Wrote control system software in Python and LabView for laser-induced melanoma cell detection
                            via photoacoustic effect.</li>

                        <br />

                        <li>Utilized SolidWorks for 3D modeling and executed rapid prototyping via 3D printing.</li>

                        <br />
                    </ul>
                </div>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/neweagle.jpeg" alt="Michigan Aerospace Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">New Eagle</h6>
                            <span>Engineer Co-op</span>
                            <small>Sep 2016 - Jul 2017 (11 months)</small>
                        </div>
                    </div>
                    <ul>
                        <li>Contributed to mechanical and electrical design and assembly for multiple hybrid vehicle
                            projects.</li>

                        <br />

                        <li>Participated in a large-scale
                            <a @click="toggleCard('NewEagle')" class="dropdown-word"> reverse engineering project
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.NewEagle"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a> for electronic control unit
                            replacement, focusing on CAN decryption, harness development, and software for I/O
                            validation and data acquisition.
                        </li>

                        <div v-if="expandedCards.NewEagle">
                            <br />
                            <p class="details">
                                Shipping container stacker in which we replaced the ECU.
                            </p>

                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.newEagle.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.newEagle.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="newEagle Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.newEagle.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.newEagle.index === index }"
                                        @click="goToSlide(index, 'newEagle')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>

                            <br />

                        </div>
                    </ul>

                </div>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/iafrate.jpeg" alt="Iafrate Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">Angelo Iafrate Construction</h6>
                            <span>Laborer</span>
                            <small>May 2014 - Jul 2016 (2 yrs 3 months)</small>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a @click="toggleCard('Iafrate')" style="cursor:pointer"> Performed general construction tasks
                                including the operation of heavy machinery.
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.Iafrate"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                        </li>

                        <div v-if="expandedCards.Iafrate">
                            <br />
                            <p class="details">
                                Standing in the pit of what is now Detroit's Little Caesars Arena, the current home of the
                                Red Wings hockey team.
                            </p>

                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.iafrate.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.iafrate.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="newEagle Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.iafrate.slides" :key="`dot-${index}`"
                                        class="dot" :class="{ 'active': slideshows.iafrate.index === index }"
                                        @click="goToSlide(index, 'iafrate')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>
                    </ul>
                </div>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/cwp.jpeg" alt="cwp Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">College Works Painting</h6>
                            <span>Branch Manager</span>
                            <small>Feb 2015 - Aug 2015 (7 months)</small>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a @click="toggleCard('CollegeWorks')" style="cursor:pointer"> Generated and managed more than
                                $50k in work over one summer.
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.CollegeWorks"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                        </li>

                        <div v-if="expandedCards.CollegeWorks">
                            <br />
                            <p class="details">
                                Before and after comparison pictures from two job sites.
                            </p>
                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.cwp.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.cwp.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="newEagle Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.cwp.slides" :key="`dot-${index}`" class="dot"
                                        :class="{ 'active': slideshows.cwp.index === index }"
                                        @click="goToSlide(index, 'cwp')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>
                    </ul>
                </div>
                <div class="card">
                    <div class="logo-container">
                        <img src="../assets/logos/gg.png" alt="gg Logo" class="company-logo" />
                        <div class="title-date-container">
                            <h6 class="company-name">Grass Guyz, LLC</h6>
                            <span>Co-owner | Manager</span>
                            <small>May 2010 - Oct 2013 (3 years 6 months)</small>

                        </div>
                    </div>
                    <ul>
                        <li>
                            <a @click="toggleCard('GrassGuyz')" style="cursor:pointer">Co-founded and managed a lawn care
                                business, overseeing around 30 accounts.
                                <i class="fas fa-caret-down exp-details" v-if="expandedCards.GrassGuyz"></i>
                                <i class="fas fa-caret-right exp-details" v-else></i></a>
                        </li>
                        <div v-if="expandedCards.GrassGuyz">
                            <br />
                            <div class="slideshow-container">
                                <div v-for="(slide, index) in slideshows.grass.slides" :key="index" class="mySlides"
                                    :class="{ 'active-slide': slideshows.grass.index === index }">
                                    <img class="slideshow-img" :src="slide" alt="grass Image">
                                </div>
                                <!-- Navigation dots -->
                                <div class="navigation-circles">
                                    <span v-for="(slide, index) in slideshows.grass.slides" :key="`dot-${index}`" class="dot"
                                        :class="{ 'active': slideshows.grass.index === index }"
                                        @click="goToSlide(index, 'grass')"></span>
                                </div>
                                <!-- Swipe controls (needs fixing) -->
                                <!-- <a class="prev" @click="changeSlide(-1, 'halas')"><i class="fa fa-chevron-left"></i></a>
                                <a class="next" @click="changeSlide(1, 'halas')"><i class="fa fa-chevron-right"></i></a> -->
                            </div>
                            <br />
                        </div>

                    </ul>
                </div>
            </section>

            <section class="education">
                <h5>Education History</h5>
                <div class="edu-cards">
                    <!-- <div class="project-card">
                        <div class="logo-container">
                            <img src="../assets/logos/boulder.jpeg" alt="boulder Logo" class="company-logo" />
                            <div class="title-date-container">
                                <h6 class="company-name">University of Colorado Boulder</h6>
                                <small>2023 - enrolled</small>
                            </div>

                        </div>

                        <br />
                        <span>Degree: Master's of Science</span>
                        <br />
                        <span>Major: Computer Science </span>
                    </div> -->

                    <div class="project-card">
                        <div class="logo-container">
                            <img src="../assets/logos/kettering.jpeg" alt="kettering Logo" class="company-logo" />
                            <div class="title-date-container">
                                <h6 class="company-name">Kettering University</h6>
                                <small>2016 - 2019</small>
                            </div>

                        </div>

                        <br />
                        <span>Degree: Bachelor's of Science</span>
                        <br />
                        <span>Major: Engineering Physics</span>
                    </div>
                    <div class="project-card">
                        <div class="logo-container">
                            <img src="../assets/logos/gvsu.jpeg" alt="gvsu Logo" class="company-logo" />
                            <div class="title-date-container">
                                <h6 class="company-name">Grand Valley State University</h6>
                                <small>2014 - 2016</small>
                            </div>

                        </div>

                        <br />
                        <span>Degree: N/A</span>
                        <br />
                        <span>Major: Product Manufacturing and Design</span>
                    </div>

                </div>
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

            <section class="certs">
                <h5>Licenses & Certifications</h5>
                <div class="edu-cards">
                    <div class="project-card" @click="navigateTo('coursera')">
                        <div class="logo-container">
                            <img src="../assets/logos/deepnn.jpeg" alt="deepnn Logo" class="company-logo" />
                            <div class="title-date-container">
                                <h6 class="company-name">Neural Networks and Deep Learning</h6>
                                <small>Issued May 2022</small>
                            </div>
                        </div>

                        <br />
                        <span>DeepLearning.AI</span>
                        <br />
                        <span>Credential ID UU3EMP2YHERR </span>
                    </div>
                    <div class="project-card">
                        <div class="logo-container">
                            <img src="../assets/logos/faa.jpeg" alt="faa Logo" class="company-logo" />
                            <div class="title-date-container">
                                <h6 class="company-name">Remote Unmanned Aircraft Pilot</h6>
                                <small>Issued Jun 2021</small>
                            </div>
                        </div>
                        <br />
                        <span>Federal Aviation Administration</span>
                    </div>

                </div>
            </section>

            <div class="wall-e-img-container">
                <img class="wall-e-img" src="../assets/wall-e/wall-e.gif" />
            </div>
        </div>
    </body>
</template>
  
<script>
export default {
    data() {
        return {
            expandedCards: {
                HALAS: false,
                DroN2O: false,
                NewEagle: false,
                Iafrate: false,
                CollegeWorks: false,
                GrassGuyz: false,
                Anemometer: false,
                Anemometer1D: false,
                Reconn: false
            },
            slideshows: {
                anemometer1D: {
                    slides: [
                        require('../assets/anemometer/eagle.png'),
                        require('../assets/anemometer/oshpark.png'),
                        require('../assets/anemometer/id-shield.png'),
                        require('../assets/anemometer/1d.png'),
                    ],
                    index: 0,
                },
                anemometer3D: {
                    slides: [
                        require('../assets/anemometer/teensy.jpg'),
                    ],
                    index: 0,
                },
                cwp: {
                    slides: [
                        require('../assets/college-works/paint1.png'),
                        require('../assets/college-works/paint2.png'),
                    ],
                    index: 0,
                },
                drone: {
                    slides: [
                        require('../assets/smartfarm/ground-payload-2.png'),
                        require('../assets/smartfarm/first-flight.png'),
                        require('../assets/smartfarm/hovering-payload.png'),
                    ],
                    index: 0,
                },
                grass: {
                    slides: [
                        require('../assets/grass-guyz/grass.jpg'),
                    ],
                    index: 0,
                },
                halas: {
                    slides: [
                        require('../assets/halas/night_lazing.jpg'),
                        require('../assets/halas/inside_airborne.jpg'),
                        require('../assets/halas/outside_airborne.jpg'),
                        require('../assets/halas/unit0-cape.jpg'),
                        require('../assets/halas/wing.jpg')
                    ],
                    index: 0,
                },
                iafrate: {
                    slides: [
                        require('../assets/iafrate/iafrate.jpg'),
                    ],
                    index: 0,
                },
                newEagle: {
                    slides: [
                        require('../assets/new-eagle/reach.png'),
                    ],
                    index: 0,
                },
                reconn: {
                    slides: [
                        require('../assets/reconn/reconn.png'),
                    ],
                    index: 0,
                },
            },

            isSpotifyLoaded: true,
        };
    },


    created() {
        if (navigator.onLine) {
            this.isSpotifyLoaded = true;
        } else {
            console.log("offline");
            this.isSpotifyLoaded = false;
        }
    },

    methods: {
        toggleCard(project) {
            this.expandedCards[project] = !this.expandedCards[project];
        },
        changeSlide(step, slideshowId) {
            let slideshow = this.slideshows[slideshowId];
            const numSlides = slideshow.slides.length;
            slideshow.index = (slideshow.index + step + numSlides) % numSlides;
        },
        goToSlide(slideIndex, slideshowId) {
            this.slideshows[slideshowId].index = slideIndex;
        },
        emitActiveComponent(project) {
            this.$emit('changeActiveComponent', project);
        },
        navigateTo(project) {
            switch (project) {
                case 'wisdom-tree':
                    window.open('http://wisdom-tree.netlify.app/', '_blank');
                    break;
                case 'coursera':
                    window.open('https://www.coursera.org/account/accomplishments/verify/UU3EMP2YHERR', '_blank');
                    break;
                case 'coming-soon':
                    // Do nothing or show a tooltip
                    break;
                default:
                    console.log('Unknown project');
            }
        },
    }
}
</script>
  
<style lang="css" scoped>
@import "../styles/global.css";

.logo-container {
    display: flex;
    align-items: flex-start;
    /* Aligns the logo to the top of the text */
}

.company-logo {
    width: 40px;
    /* Adjust size as needed */
    height: 40px;
    /* Adjust size as needed */
    border-radius: 50%;
    margin-right: 10px;
    /* Adjust spacing as needed */
    object-fit: cover;
}

.title-date-container {
    display: flex;
    flex-direction: column;
}

.company-name,
.title,
.dates {
    margin: 0;
    /* Removes default margins */
    padding-left: 0;
    /* Aligns text with the start of the company name */
}

.title {
    padding-top: 2px;
    /* Adjusts space between company name and title */
}

.dates {
    padding-top: 2px;
    /* Adjusts space between title and dates */
}

/* Continue with the rest of your CSS as needed */


.company-name {
    margin-bottom: 4px;
    /* Adds a little space between the company name and the position title */
}


.dropdown-word {
    cursor: pointer;
    color: var(--color-blockquote-text);
    text-decoration: none;

}

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

.wall-e-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-top: 200px;
    width: 90%;
    margin-left: 5%;
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
.certs,
.projects {
    margin-top: 0;
}

.exp-details {
    font-size: 12px;
}

.project-icon {
    margin-left: 20px;
}


.edu-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 4x4 grid */
    gap: 16px;
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

.slideshow-container {
    position: relative;
    justify-content: center;
    align-items: center;
    width: 90%;
}

.slideshow-img {
    margin-left: 3.5vw;
    max-width: 100%;
    border-radius: 5px;
}

.mySlides {
    display: none;
}

.mySlides img {
    object-fit: cover;
}

.mySlides.active-slide {
    display: block;
}

.navigation-circles {
    text-align: center;
}

.dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
}

.active,
.dot:hover {
    background-color: #717171;
}

/* .prev,
.next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    z-index: 1;
    margin-top: -22px;
    padding: 16px;
    color: var(--color-text);
    font-weight: bold;
    transition: 0.6s ease;
    user-select: none;
}

.next {
    right: 1vw;
}

.prev {
    left: 0;
} */


@media only screen and (max-width: 1700px) {
    .blog-img {
        max-width: 28%;
    }
}

@media only screen and (max-width: 1400px) {
    .blog-img {
        max-width: 35%;
    }
}

@media only screen and (max-width: 1200px) {
    .blog-img {
        max-width: 35%;
    }
}

@media only screen and (max-width: 1100px) {
    .blog-img {
        max-width: 45%;
    }
}

@media only screen and (max-width: 900px) {
    .details {
        width: 115%;
        margin-left: -15%;
    }

    .slideshow-container {
        height: auto;
        width: 115%;
        margin-left: -20%;
    }

    .blog-img {
        float: none;
        max-width: 70%;
        margin-bottom: 20px;
    }

    .bio-header {
        margin-top: 60px;

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
        margin-top: 20px;

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
}
</style>

