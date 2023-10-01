---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
title: Neural Field Convolutions by Repeated Differentiation
#change title to headline
# menu: "main"
draft: "false"
author: Adarsh Djeacoumar

# Role/position/tagline
description: Neural fields are evolving towards a general-purpose continuous representation for visual computing. Yet, despite their numerous appealing properties, they are hardly amenable to signal processing. As a remedy, we present a method to perform general continuous convolutions with general continuous signals such as neural fields. Observing that piecewise polynomial kernels reduce to a sparse set of Dirac deltas after repeated differentiation, we leverage convolution identities and train a repeated integral field to efficiently execute large-scale convolutions. We demonstrate our approach on a variety of data modalities and spatially-varying kernels.

# Paper authors and data:
authors:
  - name: Ntumba Elie Nsampi
    url: "https://people.mpi-inf.mpg.de/~nnsampi/"
    affiliation: 1
    weight: 10
  - name: Adarsh Djeacoumar
    url: "https://www.mpi-inf.mpg.de/home"
    affiliation: 1
    weight: 20
  - name: Hans-Peter Seidel
    url: "https://people.mpi-inf.mpg.de/~hpseidel/"
    affiliation: 1
    weight: 30
  - name: Tobias Ritschel
    url: "https://www.homepages.ucl.ac.uk/~ucactri/"
    affiliation: 2
    weight: 40
  - name: Thomas Leimkühler
    url: "https://people.mpi-inf.mpg.de/~tleimkue/"
    affiliation: 1
    weight: 50

institutions:
  1:
    name: "Max Planck Institute for Informatics"
    url: "https://www.mpi-inf.mpg.de/home/"
  2:
    name: "University College London"
    url: "https://www.ucl.ac.uk"

Paper:
  - venue: ACM Transactions on Graphics (SIGGRAPH Asia 2023)
    url: "https://asia.siggraph.org/2023/"

buttons:
  - name: PDF
    url: "https://arxiv.org/pdf/2304.01834.pdf"
    weight: 10
  - name: Cite
    url: "/publication/neural_field_conv/cite.bib"
    weight: 20
  - name: Code
    url: "https://neural-fields-conv.mpi-inf.mpg.de"
    weight: 30
  # - name: Dataset
  #   url: "https://www.ucl.ac.uk"
  #   weight: 40
  - name: Project
    url: "https://neural-fields-conv.mpi-inf.mpg.de"
    weight: 50

teaser: "teaser.png"
method: 
  - fig: "method.png"
    content: We introduce an algorithm to perform efficient continuous convolution of neural fields 𝑓 by piecewise polynomial kernels 𝑔. The key idea is to convolve the sparse repeated derivative of the kernel with the repeated antiderivative of the signal.
    align: justify
abstract:
  - name: Abstract
    content: Neural fields are evolving towards a general-purpose continuous represen- tation for visual computing. Yet, despite their numerous appealing proper- ties, they are hardly amenable to signal processing. As a remedy, we present a method to perform general continuous convolutions with general continuous signals such as neural fields. Observing that piecewise polynomial kernels reduce to a sparse set of Dirac deltas after repeated differentiation, we leverage convolution identities and train a repeated integral field to effi- ciently execute large-scale convolutions. We demonstrate our approach on a variety of data modalities and spatially-varying kernels.

# video: "" #"video.mp4"

tags:
  - computer vision
  - computer-graphics
  - machine learning
  - rendering
---

