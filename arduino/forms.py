# -*- coding: utf-8 -*-


from django import forms

class CommandForm(forms.Form):
    text = forms.CharField(max_length=500)
    
