<template>
  <div>
    <span>{{ parameter.id }}</span>
    <ParameterSelect :parameterId="parameter.id" />
    <ParameterDelete :parameterId="parameter.id" />
  </div>

</template>

<script>
import ParameterSelect from './ParameterSelect';
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter'],
  components: { ParameterDelete, ParameterSelect }
};
</script>
