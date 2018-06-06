<template>
  <div>
    <span>bem {{ parameter.id }}</span>
    <ParameterDelete :parameterId="parameter.id" />
  </div>

</template>

<script>
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter'],
  components: { ParameterDelete }
};
</script>
