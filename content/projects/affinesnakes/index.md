---
title: Affine Snakes in Vector fields
draft: false
author: Adarsh Djeacoumar

# Role/position/tagline
description: Affine Snakes in Vector fields
weight: 1
buttons:
  - name: B-Thesis
    url: "https://drive.google.com/file/d/1iYt6VGVS6SRY-VnMXZqEfzBDsnQr_p79/view"
    weight: 10

# Paper authors and data:
authors:
  - name: Adarsh Djeacoumar
    url: "https://sshadr.github.io"
    weight: 10


teaser: "teaser.png"
abstract:
  - name: "Abstract"
    content: "Vector fields are used to develop many interesting algorithms. In this project, we 
developed an algorithm that evolves a curve guided by the gradient information derived from a region on an image. We evaluate our method on a medical image dataset for Optic Disc segmentation.
"
# video: "video.mp4"

tags:
  - computer-graphics
---

## Computed Vector Fields
<figure>
    <img src="grads.png" alt="Computed Vector Fields">
    <figcaption><strong>Left:</strong> GVF (Gradient Vector Field) | <strong>Right:</strong> EPGVF (Edge-Preserving GVF)</figcaption>
</figure>

## Algorithm Comparison
<figure>
    <img src="img1.png" alt="Algorithm Comparison">
    <figcaption>
        Fig. shows the difference between our algorithm working on two different vector fields 
        &mdash; <strong>GVF</strong> and <strong>EPGVF</strong>.
    </figcaption>
</figure>

## Multiple Regions of Interest
<figure>
    <img src="img2.png" alt="Multiple Regions of Interest">
    <figcaption>
        Our algorithm working on multiple regions of interest.
    </figcaption>
</figure>

## Video
<figure>
    <video controls>
        <source src="/projects/affinesnakes/video.mp4" type="video/mp4">
    </video>
    <figcaption>
        Here you see a real-time video of the Optimization and Curve evolution.
    </figcaption>
</figure>