---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
content_type: markdown
title: Algorithms for Real-time Ray tracing
#change title to headline
# menu: "main"
draft: "false"
author: Adarsh Djeacoumar

weight: 5
# Role/position/tagline
description: Implemented Spatiotemporal Variance-Guided Filtering

# Paper authors and data:
authors:
  - name: Adarsh Djeacoumar
    url: "https://sshadr.github.io"
    # affiliation: 1
    weight: 10

Paper:
  - venue: Computer Graphics, Saarland University.
    url: "https://graphics.cg.uni-saarland.de/courses/"

teaser: "teaser.png"
# method: 
#   - fig: "water.png"
#     content: Cornell Box (SDS path) - Progessive Photon Mapping
#     align: center
# abstract:
#   - name: ""
#     content: ""

# video: "" #"video.mp4"

tags:
  - computer-graphics
  - rendering


---
<figure align='center'>
  <div style='display: flex; justify-content: center;'>
    <img src='/projects/rtrt/2spp.png' alt=''>
    <img src='/projects/rtrt/teaser.png' alt=''>
  </div>
  <figcaption>The result of the SVGF algorithm with 5 passes of Atrous Wavelet filtering from an initial image rendered at 2 SPP.</figcaption>
</figure>


### Background
Another exciting opportunity arose when the Computer Graphics group offered a seminar. In this seminar, participants were tasked with a two-fold challenge: selecting and presenting a research paper of their choice, and then implementing the corresponding algorithm within their in-house ray tracer, [Ignis](https://github.com/PearCoding/Ignis). This experience allowed us to delve deeper into the world of computer graphics and gain hands-on experience with cutting-edge techniques.

"Ignis is a high-performance raytracer implemented using the Artic frontend of the [AnyDSL](https://anydsl.github.io/) compiler framework and based on [Rodent](https://github.com/AnyDSL/rodent) . The renderer is usable on all three major platforms (Linux, Windows, MacOs)."

AnyDSL is built on top of [Impala](https://anydsl.github.io/Impala.html), which is an "imperative and functional programming language which targets the Thorin intermediate representation. Its syntax heavily borrows from Rust, with some noticeable changes: It allows user-directed partial evaluation of code and continuation-passing style (CPS)".

In a nutshell, this means that we had access to parallel processing speeds, implementation syntaxes similar to CUDA but in an entirely "new" language! This project marked my first significant venture into the realm of software engineering. It provided valuable insights into various pipelines involving interoperability between different programming languages, honed my debugging skills (involved in a rendering pipeline), and expanded my knowledge of algorithm implementation.

### The Algorithm

<figure align='center'>
  <div style='display: flex; justify-content: center;'>
    <img src='/projects/rtrt/algo.png' alt=''>
  </div>
  <figcaption>The SVGF algorithm as described in the paper.</figcaption>
</figure>

The paper that I chose to present and implement was: [Spatiotemporal Variance-Guided Filtering: Real-Time Reconstruction for Path-traced Global Illumination](https://research.nvidia.com/publication/2017-07_spatiotemporal-variance-guided-filtering-real-time-reconstruction-path-traced). The algorithm had 3 passes, namely, temporal accumulation, variance estimation, and atrous-wavelet filtering (spatial domain). I'll pass on explaining the details here. Interested readers can refer to the original paper where they show their algorithm working on more complex scenes !

I dedicated approximately two months to this implementation, during which I successfully completed the Atrous filtering pass as outlined in the paper. I also managed to develop a functional, albeit buggy, implementation of temporal accumulation. Unfortunately, due to time constraints, I had to skip the variance estimation step. Here are additional results from the implementation.

<figure align='center'>
  <div style='display: flex; justify-content: center;'>
    <img src='/projects/rtrt/2spp.png' alt=''>
    <img src='/projects/rtrt/temporal.png' alt=''>
  </div>
  <figcaption>The (buggy) result of the SVGF algorithm with temporal accumulation and 5 passes of Atrous Wavelet filtering from an initial image rendered at 2 SPP. The variance estimation and subsequent filtering based on the estimate was skipped due to time constraints.</figcaption>
</figure>

And because depth maps were cool to look at:

<figure align='center'>
  <div style='display: flex; justify-content: center;'>
    <img src='/projects/rtrt/depth.png' alt=''>
    <img src='/projects/rtrt/depth_inverted.png' alt=''>
  </div>
  <figcaption>Depths are normalized between [0, 1]. (a) When camera is at max_depth==1 (b) Inverted</figcaption>
</figure>
