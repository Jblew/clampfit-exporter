kubectl config set-credentials ns-default-user \
    --kubeconfig _dev/kubeconfig-production.yml \
    --embed-certs=true \
    --client-certificate=/Users/jedrzejlewandowski/git-repository/katedra2/users/${KATEDRA2_USER}.crt \
    --client-key=/Users/jedrzejlewandowski/git-repository/katedra2/users/${KATEDRA2_USER}.key