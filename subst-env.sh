#/usr/bin/env bash
export GIT_VERSION_TAG="$(git describe --tags --abbrev=0)"
export IMAGES_VERSION_BASED_ON_GIT_TAG="${GIT_VERSION_TAG:1}"

for file in k8/*.yml
do
    echo "====${file}===="
    envsubst < "${file}" > "${file}.out" && mv "${file}.out" "${file}"
    cat  "${file}"
    echo "\n"
done