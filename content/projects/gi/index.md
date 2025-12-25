---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
content_type: markdown
title: GI Techniques
#change title to headline
# menu: "main"
draft: false
author: Adarsh Djeacoumar

weight: 4
# Role/position/tagline
description: Common scenes rendered using GI techniques as a part of the Realistic Image Synthesis course.

# Paper authors and data:
authors:
  - name: Adarsh Djeacoumar
    # url: "https://www.mpi-inf.mpg.de/home"
    # affiliation: 1
    url: "https://www.mpi-inf.mpg.de/home"
    weight: 10
  - name: Anh Tuan Tran
    # url: "https://people.mpi-inf.mpg.de/~hpseidel/"
    # affiliation: 1
    url: "https://people.mpi-inf.mpg.de/~hpseidel/"
    weight: 20

Paper:
  - venue: Realistic Image Synthesis, Saarland University.
    url: "https://graphics.cg.uni-saarland.de/courses/"

teaser: "water.png"
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

As a part of the course, Realistic Image Synthesis, we explored different Global Illumination algorithms. Here I show the results of 2 algorithms that we implemented, Path Tracing and Progressive Photon Mapping, on a Cornell Box scene with slightly complex materials. 

<figure>
    <img src='/projects/gi/teaser.png' alt=''>
    <figcaption>Cornell Box (Glossy) - Path traced with Next Event Estimation</figcaption>
</figure>

<figure>
    <img src='/projects/gi/water.png' alt=''>
    <figcaption>Cornell Box (S-D-S path) - Progessive Photon Mapping</figcaption>
</figure>

<figure>
    <img src='/projects/gi/specular.png' alt=''>
    <figcaption>Cornell Box (Glossy) - Progessive Photon Mapping</figcaption>
</figure>
