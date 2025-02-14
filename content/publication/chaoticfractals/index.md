---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
title: Learning Image Fractals Using Chaotic Differentiable Point Splatting
projecturl: "https://chaotic-fractals.mpi-inf.mpg.de"
weight: 3
#change title to headline
# menu: "main"
draft: "false"
author: Adarsh Djeacoumar

# Role/position/tagline
description: 
# Paper authors and data:
authors:
  - name: Adarsh Djeacoumar
    url: "https://sshadr.github.io"
    affiliation: 1
    weight: 10
  - name: Felix Mujkanovic
    url: "https://people.mpi-inf.mpg.de/~fmujkano/"
    affiliation: 1
    weight: 20
  - name: Hans-Peter Seidel
    url: "https://people.mpi-inf.mpg.de/~hpseidel/"
    affiliation: 1
    weight: 30
  - name: Thomas Leimkühler
    url: "https://people.mpi-inf.mpg.de/~tleimkue/"
    affiliation: 1
    weight: 40

institutions:
  1:
    name: "Max Planck Institute for Informatics"
    url: "https://www.mpi-inf.mpg.de/home/"

Paper:
  - venue: Computer Graphics Forum (Eurographics 2025)
    url: ""

buttons:
  - name: PDF (soon)
    url: ""
    weight: 10
  - name: Cite
    url: "/publication/chaoticfractals/cite.bib"
    weight: 20
  - name: Code (soon)
    url: ""
    weight: 30
  # - name: Dataset
  #   url: "https://www.ucl.ac.uk"
  #   weight: 40
  - name: Project (soon)
    url: ""
    weight: 50
  - name: Thesis
    url: "https://drive.google.com/file/d/1vudMiDbJDaSTR6OpXoWwP6XMhQ25NqPt/view?usp=share_link"
    weight: 50

teaser: "teaser.png"
method: 
  - fig: "method.png"
    content: We introduce a novel method to recover a fractal description from an image containing a self-similar shape. This representation allows for infinite zoom-ins, continuously generating fine details at any chosen scale and capturing intricate structural patterns.
    align: justify
abstract:
  - name: Abstract
    content: Fractal geometry, defined by self-similar patterns across scales, is crucial for understanding natural structures. This work addresses the fractal inverse problem, which involves extracting fractal codes from images to explain these patterns and synthesize them at arbitrary finer scales. We introduce a novel algorithm that optimizes Iterated Function System parameters using a custom fractal generator combined with differentiable point splatting. By integrating both stochastic and gradient-based optimization techniques, our approach effectively navigates the complex energy landscapes typical of fractal inversion, ensuring robust performance and the ability to escape local minima. We demonstrate the method's effectiveness through comparisons with various fractal inversion techniques, highlighting its ability to recover high-quality fractal codes and perform extensive zoom-ins to reveal intricate patterns from just a single image.

# video: "" #"video.mp4"

tags:
  - computer-graphics
  - machine learning
  - Point rendering
---

