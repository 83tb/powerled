
from django.db import models
from django.template.defaultfilters import slugify




class Warehouse(models.Model):

    name = models.CharField(max_length=20)
    slug = models.SlugField(blank=True)

    class Meta:
        ordering = ("name",)

    def __unicode__(self):
        return self.name

    @models.permalink
    def get_absolute_url(self):
        return ("warehouse", (self.slug,))

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Warehouse, self).save(*args, **kwargs)

class WarehouseUser(models.Model):

    name = models.CharField(max_length=20)
    session = models.CharField(max_length=20)
    warehouse = models.ForeignKey("lpanel.Warehouse", related_name="users")

    class Meta:
        ordering = ("name",)

    def __unicode__(self):
        return self.name
