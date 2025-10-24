ARG FEDORA_MAJOR_VERSION=rawhide
ARG FEDORA_DE=silverblue

FROM quay.io/fedora-ostree-desktops/${FEDORA_DE}:${FEDORA_MAJOR_VERSION}

RUN dnf remove -y firefox tcl
RUN dnf in -y alacritty \
	autoconf \
	cockpit \
	cockpit-machines \
	bison \
	flex \
	openssl-devel \
	hyprland \
	gdb \
	glib \
	libvirt \
	libvirt-client \
	libzstd-devel \
	lld \
	llvm \
	lua5.1-lpeg \
	make \
	neovim \
	ostree-devel \
	pre-commit \
	python3-pip \
	qemu \
	qemu-kvm \
	ripgrep \
	tmux \
	virt-install \
	zsh \
	waybar && \

	dnf clean all