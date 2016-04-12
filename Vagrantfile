# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config| 
  config.vm.box = "avenuefactory/lamp"
  config.vm.network :public_network, type: "dhcp"
  config.vm.synced_folder "./", "/var/www/html", id: "vagrant-root",
   owner: "vagrant",
   group: "www-data",
   mount_options: ["dmode=775,fmode=664"]

  # Output the IP address for easy access to the VM
  config.vm.provision "shell",
    inline: "/sbin/ifconfig eth1 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'",
    run: "always"
end
