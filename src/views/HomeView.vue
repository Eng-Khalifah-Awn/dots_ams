<template>
  <div class="container-fluid py-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <div class="row mb-3">
      <div class="col-lg-6 col-md-6 col-sm-6 ">
        <div class="card">
          <Chart type="bar" :data="chartData" :options="chartOptions"/>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 ">
        <div class="card">
          <Chart type="pie" :data="chartData" :options="chartOptions"/>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-6 col-md-6 col-sm-6 ">
        <div class="card">
          <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 ">
        <div class="card flex justify-center">
          <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {checkUserLogin} from "@/services/checkUserSignin.js";
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';


const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Assets',
        data: [540, 325, 702, 620],
        backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        borderWidth: 1
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}

onMounted(async ()=>{
  await checkUserLogin();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
})


</script>

<style scoped>

</style>