---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
title: Learning Images Across Scales Using Adversarial Training
#change title to headline
# menu: "main"
draft: "false"
author: Adarsh Djeacoumar

# Role/position/tagline
description: The real world exhibits rich structure and detail across many scales of observation. It is difficult, however, to capture and represent a broad spectrum of scales using ordinary images. We devise a novel paradigm for learning a representation that captures an orders-of-magnitude variety of scales from an unstructured collection of ordinary images. We treat this collection as a distribution of scale-space slices to be learned using adversarial training, and additionally enforce coherency across slices. Our approach relies on a multiscale generator with carefully injected procedural frequency content, which allows to interactively explore the emerging continuous scale space. Training across vastly different scales poses challenges regarding stability, which we tackle using a supervision scheme that involves careful sampling of scales. We show that our generator can be used as a multiscale generative model, and for reconstructions of scale spaces from unstructured patches. Significantly outperforming the state of the art, we demonstrate zoom-in factors of up to 256x at high quality and scale consistency.
# Paper authors and data:
authors:
  - name: Krzysztof Wolski
    url: "http://people.mpi-inf.mpg.de/~kwolski/"
    affiliation: 1
    weight: 10
  - name: Adarsh Djeacoumar
    url: "https://sshadr.github.io"
    affiliation: 1
    weight: 20
  - name: Alireza Javanmardi
    url: "https://av.dfki.de/members/javanmardi/"
    affiliation: 1
    weight: 30
  - name: Hans-Peter Seidel
    url: "https://people.mpi-inf.mpg.de/~hpseidel/"
    affiliation: 1
    weight: 40
  - name: Christian Theobalt
    url: "https://people.mpi-inf.mpg.de/~theobalt/"
    affiliation: 1
    weight: 50
  - name: Guillaume Cordonnier
    url: "https://www-sop.inria.fr/members/Guillaume.Cordonnier/"
    affiliation: 2
    weight: 60
  - name: Karol Myszkowski
    url: "http://people.mpi-inf.mpg.de/~karol/"
    affiliation: 1
    weight: 70
  - name: George Drettakis
    url: "https://www-sop.inria.fr/members/George.Drettakis/"
    affiliation: 2
    weight: 80
  - name: Xingang Pan
    url: "https://xingangpan.github.io/"
    affiliation: 3
    weight: 90
  - name: Thomas Leimkühler
    url: "https://people.mpi-inf.mpg.de/~tleimkue/"
    affiliation: 1
    weight: 100

institutions:
  1:
    name: "Max Planck Institute for Informatics"
    url: "https://www.mpi-inf.mpg.de/home/"
  2:
    name: "Inria, Université Côte d'Azur"
    url: ""
  3:
    name: "Nanyang Technological University"
    url: ""

Paper:
  - venue: ACM Transactions on Graphics (SIGGRAPH 2024)
    url: "https://asia.siggraph.org/2023/"

buttons:
  - name: PDF
    url: "https://scalespacegan.mpi-inf.mpg.de/files/scalespacegan_paper.pdf"
    weight: 10
  - name: Cite
    url: "/publication/scalespacegan/cite.bib"
    weight: 20
  - name: Code
    url: ""
    weight: 30
  # - name: Dataset
  #   url: "https://www.ucl.ac.uk"
  #   weight: 40
  - name: Project
    url: "https://scalespacegan.mpi-inf.mpg.de"
    weight: 50

teaser: "teaser.png"
method: 
  - fig: "method.png"
    content: Given an unregistered collection of image patches depicting an environment at vastly different scales, our approach uses adversarial training to obtain continuous and coherent scale spaces. Here, we showcase the reconstructed scale space of a painting, captured in its entirety, from the overall structure (1x) to the cracks in the oil paint (256x). Users can freely explore the scale space at interactive rates.
    align: justify
abstract:
  - name: Abstract
    content: The real world exhibits rich structure and detail across many scales of observation. It is difficult, however, to capture and represent a broad spectrum of scales using ordinary images. We devise a novel paradigm for learning a representation that captures an orders-of-magnitude variety of scales from an unstructured collection of ordinary images. We treat this collection as a distribution of scale-space slices to be learned using adversarial training, and additionally enforce coherency across slices. Our approach relies on a multiscale generator with carefully injected procedural frequency content, which allows to interactively explore the emerging continuous scale space. Training across vastly different scales poses challenges regarding stability, which we tackle using a supervision scheme that involves careful sampling of scales. We show that our generator can be used as a multiscale generative model, and for reconstructions of scale spaces from unstructured patches. Significantly outperforming the state of the art, we demonstrate zoom-in factors of up to 256x at high quality and scale consistency.

# video: "" #"video.mp4"

tags:
  - computer vision
  - computer-graphics
  - machine learning
  - rendering
---

