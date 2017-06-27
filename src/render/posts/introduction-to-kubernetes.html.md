---
title: "Introduction to Kubernetes"
cover: '/img/heads/steven-wei-124690.jpg'
isPost: true
active: true
excerptOther: 'A quick intro to using Kubernetes and some of the features it has'
postDate: '2017-06-27'
date: '2017-06-27'
tags:
 - kubernetes
---

This post is a relatively short introduction to kubernetes. We will look at using kubernetes in two ways. With Google cloud and with minikube.

You can use one or the other or both. Or indeed some other cloud provider. I recommend playing around with Google Cloud Platform (GCP) ad minikube since it won't cost you anything. For GCP you just need a Google account. You will also need a way to setup billing which pretty much means you will need a credit card. You won't have to spend money but you will need billing enabled in the GCP account. 

### Install the GCP SDK

Instructions here are good: https://cloud.google.com/sdk/

You can also just use the cloud console in the google cloud console but I will use gcloud in the examples here.

### Install kubectl

Assumes you have followed the instructions above and installed gcloud:

```
 gcloud components install kubectl
 ```

### Google Cloud Platform

You can just skip forward and setup minikube if you prefer but I recommend using this to have something a little more 'real'. 

First you need a google account. Not much point me explaining how to do that I guess. 

Then you will need to setup a GCP dashboard for yourself (if you haven't one already). Just open this link https://console.cloud.google.com/start and follow the instructions. 

You will be offereed a free trial but you still have to enter a credit card. 

#### Create a cluster in GCP

First, create a project.

If you haven't authorized gcloud already, do so now like so:
```
gcloud auth login
```
That should open a browser window where you can login to your google account. 

Now configure the project you created (PROJECT_ID should be replaced with the ID of your project):
```
gcloud config set project PROJECT_ID
```
Configure your desired zone like this:

```
gcloud config set compute/zone europe-west1-d
```

You can list the available zones with this command:
```
gcloud compute zones list
```

### minikube

Minikube basically lets you run kubernetes locally. Follow the instructions here to get it setup:
https://github.com/kubernetes/minikube

With minkube creating a clust is a little easier:

```
minikube start
```

You also have the added advantage of not needing to setup a GCP account and all that but it's only useful for developing stuff locally of course.

To make sure kubectl is pointing at minikube try this:

```
kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443
KubeDNS is running at https://192.168.99.100:8443/api/v1/proxy/namespaces/kube-system/services/kube-dns
kubernetes-dashboard is running at https://192.168.99.100:8443/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard
```

### Switching contexts in kubectl

If you end up using both GCP and mimikube, it's useful to easily switch contexts in kubectl

These commands help:

```
kubectl config get-contexts
```

```
kubectl config use-context ${context_name}
```

You can also set the context in each call:

```
kubectl <some options here> --context=minikube
```

### Deploy something

For this we can create a simple hello world application and put it in a container. Here's one I made earlier: https://hub.docker.com/r/ruairitobrien/hello-kubernetes-world/

Note, these instructions should work the same whether you are using GCP or minikube.

Code for that is here https://github.com/ruairitobrien/hello-kubernetes-world

```
kubectl run hello-kubernetes --image ruairitobrien/hello-kubernetes-world:latest
```

You should usually specify a version number there but ':latest' will do for this tutorial. 
You should see

```
deployment "hello-kubernetes" created
```

Verify it worked

```
$ kubectl get deployments
NAME               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
hello-kubernetes   1         1         1            1           1m
```

You can also check the pod that was created:

```
$ kubectl get pods
NAME                                READY     STATUS    RESTARTS   AGE
hello-kubernetes-3390701390-jds31   1/1       Running   0          1m
```

Pods are an important part of kubernetes but rather than me going on about them it's best to read up here: https://kubernetes.io/docs/concepts/workloads/pods/pod/

It's also useful to check out the describe functions. Most things have them. For example:



```
kubectl describe deployment hello-kubernetes

kubectl describe pods hello-kubernetes-3390701390-jds31
```

