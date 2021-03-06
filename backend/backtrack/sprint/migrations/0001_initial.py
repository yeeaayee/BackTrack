# Generated by Django 2.2.7 on 2019-12-07 13:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('description', models.CharField(max_length=500)),
                ('status', models.CharField(max_length=20)),
                ('estimated_time', models.PositiveIntegerField(default=0)),
                ('pbi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='product.PBI')),
                ('pic', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='user.User')),
            ],
        ),
    ]
