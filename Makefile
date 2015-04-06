FILES = \
	install.rdf \
	bootstrap.js \
	$(NULL)

# pull version out of install.rdf
VERSION := $(shell grep \<version\> install.rdf | sed -e 's,^[^>]*>,,' -e 's,<.*,,')

all: package

package: webvr-addon-$(VERSION).xpi

webvr-addon-$(VERSION).xpi: $(FILES)
	rm -f $@
	zip -9r $@ $^
	@echo $@
