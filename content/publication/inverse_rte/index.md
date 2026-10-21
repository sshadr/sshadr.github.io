---
# title: "First"
# date: 2023-08-27T00:45:42+02:00
# draft: true
title: Volumetric Inverse Rendering via Neural Radiative Transfer
projecturl: "https://neural-radiative-transfer.mpi-inf.mpg.de"
#change title to headline
# menu: "main"
draft: "false"
author: Adarsh Djeacoumar
weight: 4
# Role/position/tagline
description: Volumetric inverse rendering seeks to recover the optical properties of participating media from images. Existing approaches either rely on differentiable stochastic light transport simulation, which require substantial algorithmic effort, or use simplified models that fail to capture global illumination. We propose a formulation that reconciles physically complete light transport with general-purpose neural optimization. The optical properties of the medium and the full light field are represented as neural fields and estimated through a joint optimization process. Global illumination is enforced via a residual objective derived from the Radiative Transfer Equation in local differential form, complemented by a volume rendering term along primary viewing rays to mitigate low-frequency bias. We demonstrate reconstruction of spatially varying, color-resolved scattering, absorption, and phase function parameters from multi-view images. Beyond reconstruction, the same framework supports learning generative models of participating media with physical optical properties under global illumination.

# Paper authors and data:
authors:
  - name: Ntumba Elie Nsampi
    url: "https://scholar.google.com/citations?user=s1YzWUEAAAAJ&hl=en"
    affiliation: 1
    weight: 10
  - name: Adarsh Djeacoumar
    url: "https://sshadr.github.io"
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
  - venue: Computer Graphics Forum (EGSR 2026)
    url: "https://egsr2026.inria.fr/programme/"

award: "Best Paper Award"

buttons:
  - name: PDF
    url: "https://neural-radiative-transfer.mpi-inf.mpg.de/static/paper/paper_c.pdf"
    weight: 10
  - name: Cite
    url: "/publication/inverse_rte/cite.bib"
    weight: 20
  - name: Code
    url: "https://github.com/elientumba2019/Volumetric_Inverse_Rendering_via_Neural_Radiative_Transfer"
    weight: 30
  # - name: Dataset
  #   url: "https://www.ucl.ac.uk"
  #   weight: 40
  - name: Project
    url: "https://neural-radiative-transfer.mpi-inf.mpg.de"
    weight: 50

teaser: "radiative-transfer.webp"
method: 
  - fig: "method.webp"
    content: We propose a formulation for volumetric inverse rendering under global illumination without explicit global-illumination rendering. By framing the problem as constrained optimization over neural fields, the approach enables physically consistent reconstruction, novel-view synthesis, and relighting. Here, we demonstrate relighting of the reconstructed volume with anisotropic optical properties using a combination of environment illumination and three colored local light sources.
    align: justify
abstract:
  - name: Abstract
    content: Volumetric inverse rendering seeks to recover the optical properties of participating media from images. Existing approaches either rely on differentiable stochastic light transport simulation, which require substantial algorithmic effort, or use simplified models that fail to capture global illumination. We propose a formulation that reconciles physically complete light transport with general-purpose neural optimization. The optical properties of the medium and the full light field are represented as neural fields and estimated through a joint optimization process. Global illumination is enforced via a residual objective derived from the Radiative Transfer Equation in local differential form, complemented by a volume rendering term along primary viewing rays to mitigate low-frequency bias. We demonstrate reconstruction of spatially varying, color-resolved scattering, absorption, and phase function parameters from multi-view images. Beyond reconstruction, the same framework supports learning generative models of participating media with physical optical properties under global illumination.

# video: "" #"video.mp4"

tags:
  - computer-graphics
  - machine learning
  - rendering
---

