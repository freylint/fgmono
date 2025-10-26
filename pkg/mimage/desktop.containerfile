ARG FEDORA_MAJOR_VERSION=rawhide
ARG FEDORA_DE=silverblue

FROM quay.io/fedora-ostree-desktops/${FEDORA_DE}:${FEDORA_MAJOR_VERSION}

RUN dnf remove -y tcl
RUN sudo dnf install -y https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
RUN sudo dnf config-manager setopt fedora-cisco-openh264.enabled=1
RUN dnf install -y --refresh \
    ca-certificates \
    chromium \
    python3-pip \
    npm

# Add vscode repo
RUN rpm --import https://packages.microsoft.com/keys/microsoft.asc && \
    cat > /etc/yum.repos.d/vscode.repo <<'EOF'
[code]
name=Visual Studio Code
baseurl=https://packages.microsoft.com/yumrepos/vscode
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc
EOF

# Install vscode
RUN dnf -y --refresh install code || dnf -y --refresh install https://update.code.visualstudio.com/latest/linux-rpm-x64/stable
RUN dnf clean all