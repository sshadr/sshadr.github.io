---
title: Neural Denoising in a Shader
draft: "false"
author: Adarsh Djeacoumar

# Role/position/tagline
description: Neural Denoising in a Shader

# Paper authors and data:
authors:
  - name: Aaron Beis
    url: "https://slerpy.xyz"
    weight: 10
  - name: Adarsh Djeacoumar
    weight: 20
  - name: Shailesh Mishra
    url: "https://shailesh-mishra.com"
    weight: 30


teaser: "teaser.png"
method: 
  - fig: "teaser.png"
    content: Input [1 SPP] ----------------------------- GroundTruth [1024 SPP] ----------------------------- Filtered Result [From 1 SPP]
    align: center
abstract:
  - name: ""
    content: ""
# video: "video.mp4"

tags:
  - computer-graphics
  - computer-vision
  - rendering
---
<!-- ![Teaser Image](/projects/wamnet/teaser.png "Input-----GroundTruth-----Filtered Result") -->

## The Idea
This very cool idea was conceived by Aaron Beis and tackled as a team. We imposed severe constraints on the pipeline in the sense that we wanted maximum results while limiting model size so that we could fit it inside a fragment shader. Also FPS!

## Design
We designed a pipeline that uses a denoising filter called WAMNet, short for 'Wait a Minute Network.' We coined this name because it took about a minute to learn the filter for a single scene. This filter denoises the input from inside an OpenGL fragment shader. We generated chunks of data with [RGB, normals] as input, and trained a Multi-Layer Perceptron (MLP) with sine activations. The inclusion of normals enforced geometric consistency within the scene and helped preserve high frequencies. After training, we used the model weights to generate the shader code and predict the output color. Here is the [report](/projects/wamnet/report.pdf) that offers more details. Overall, it was a very fun project to work on !

![Results](/projects/wamnet/video.gif)
<figcaption>Here you see a video of the shader denoising in real-time!</figcaption>

#### Credits
This project served as the spark for all my subsequent decisions in my Masters. These 2 guys, Aaron and Shailesh, have continued to be a constant source of inspiration and still motivate me to explore the depths of the Graphics world. Thanks to them, forward rendering will always hold a special place in my professional life! 
